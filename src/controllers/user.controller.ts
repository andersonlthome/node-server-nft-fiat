import {
  Body,
  Controller,
  // Get,
  //   Path,
  Post,
  //   Query,
  Route,
  // SuccessResponse,
  // Request,
  Security,
  Tags,
} from "tsoa";
// import { CreateUserViewModel, LoginViewModel } from "../interfaces/user";
// import * as jwt from "jsonwebtoken";
// import { jwtSecret } from "../authentication";
// import prisma from "../lib/prisma";

@Route("user")
@Tags("User")
export class UsersController extends Controller {
  // @Security("jwks", ["user"])
  // @Get("info")
  // public async getUserInfo(@Request() request: any): Promise<any> {
  //   return request.user;
  // }

  @Security("jwks", ["user"])
  @Post("verify")
  public async verify(@Body() requestBody: any): Promise<any> {
    // const { verifierId } = requestBody;
    console.log(requestBody);
    // if pass per authentification return ok
    return { message: "ok" };
  }

  // @SuccessResponse("201")
  // @Post()
  // public async createUser(
  //   @Body() requestBody: CreateUserViewModel
  // ): Promise<void> {
  //   this.setStatus(201);
  //   await prisma.user.create({
  //     data: {
  //       ...requestBody,
  //     },
  //   });
  //   return;
  // }

  // @SuccessResponse("200")
  // @Post("login")
  // public async login(@Body() requestBody: LoginViewModel): Promise<string> {
  //   const users = await prisma.user.findMany({
  //     where: {
  //       wallet: { equals: requestBody.wallet },
  //       password: { equals: requestBody.password },
  //     },
  //     take: 1,
  //   });

  //   if (users != null && users.length > 0) {
  //     this.setStatus(200);
  //     const user = users[0];

  //     var token = jwt.sign(
  //       {
  //         id: user.id,
  //         name: user.name,
  //         wallet: user.wallet,
  //         email: user.email,
  //         scopes: ["user"],
  //       },
  //       jwtSecret,
  //       {
  //         algorithm: "HS256",
  //         expiresIn: 36000,
  //         //   audience: "http://sistema-auth.com.br",
  //         //   issuer: "http://sistema-auth.com.br",
  //       }
  //     );

  //     return token;
  //   } else {
  //     this.setStatus(404);
  //     return "";
  //   }
  // }
}
