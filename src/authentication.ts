import "dotenv/config";
import * as express from "express";
// import * as jwt from "jsonwebtoken";
import {
  // UserViewModel,
  UserAuthenticated,
} from "./interfaces/user";
import { UserService } from "./services/user.service";

// JWT verification using JWKS
import * as jose from "jose";

export const jwtSecret = process.env.JWT_SECRET || "secret";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {

  if (securityName === "jwks") {
    // passed from the frontend in the Authorization header
    const idToken = request.headers.authorization?.split(" ")[1] as string;

    // passed from the frontend in the request body
    const app_pub_key = request.body.appPubKey;

    return new Promise<UserAuthenticated>(async (resolve, reject) => {
      if (!idToken || !app_pub_key) {
        return reject(new Error("No token or public key provided"));
      }

      // Get the JWK set used to sign the JWT issued by Web3Auth
      const jwks = jose.createRemoteJWKSet(
        new URL("https://api.openlogin.com/jwks")
      );

      let jwtDecoded;
      try {
        // Verify the JWT using Web3Auth's JWKS
        jwtDecoded = await jose.jwtVerify(idToken, jwks, {
          algorithms: ["ES256"],
        });
      } catch (error) {
        console.error("Error on jwtVerify", error);
        return reject(new Error("Error on jwtVerify"));
      }

      // Checking `app_pub_key` against the decoded JWT wallet's public_key
      if ((jwtDecoded.payload as any).wallets[0].public_key === app_pub_key) {
        
        const userReq = {
          verifierId: (jwtDecoded.payload as any).verifierId as string,
          email: ((jwtDecoded.payload as any).email as string) ?? null,
          name: ((jwtDecoded.payload as any).name as string) ?? null,
          typeOfLogin:
            ((jwtDecoded.payload as any).typeOfLogin as string) ?? null,
          profileImage:
            ((jwtDecoded.payload as any).profileImage as string) ?? null,
          scopes: ((jwtDecoded.payload as any).scopes as string[]) ?? ["user"],
        };
        const userW3A = await new UserService().findOne(userReq.verifierId);

        if (userW3A && userW3A.scopes.length > 0) {
          jwtDecoded.payload.scopes = userW3A.scopes;
          userReq.scopes = userW3A.scopes;
        } else if (!userW3A) {
          jwtDecoded.payload.scopes = ["user"];
          userReq.scopes = ["user"];
        }

        if (scopes != undefined) {
          for (let scope of scopes) {
            if (!userReq.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }
        }

        // save user if not exists or if theres a update to do
        if (
          !userW3A ||
          userW3A.verifierId !== userReq.verifierId ||
          userW3A.email !== userReq.email ||
          userW3A.name !== userReq.name ||
          userW3A.typeOfLogin !== userReq.typeOfLogin ||
          userW3A.profileImage !== userReq.profileImage
        ) {
          new UserService().save(userReq);
        }

        resolve(jwtDecoded.payload as any);
      } else {
        return Promise.reject(new Error("idToken don't match."));
      }
    });
  } else {
    return Promise.reject(new Error("Unknown security type name"));
  }
}