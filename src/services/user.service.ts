import { UserW3A } from "@prisma/client";
import prisma from "../lib/prisma";

interface IUserSaveParams {
  id?: number;
  email?: string;
  verifierId:  string
  name?: string;
  typeOfLogin?: string;
  profileImage?: string;
}

interface IUserSaved {
  id: any;
  createdAt?: Date;
  updatedAt?: Date;
  verifierId:  string
  email?: string | null;
  name?: string | null;
  typeOfLogin?: string | null;
  profileImage?: string | null;
}

export class UserService {
  public async getAll(): Promise<any> {
    const results = await prisma.userW3A.findMany();

    return results;
  }

  public async findOne(verifierId: string): Promise<UserW3A | null> {
    const results = await prisma.userW3A.findFirst({
      where: { verifierId: verifierId },
    });

    return results;
  }

  public async save(userSaveParams: IUserSaveParams): Promise<any> {
    try {
      const user: IUserSaved = await prisma.userW3A.upsert({
        create: userSaveParams,
        update: userSaveParams,
        where: {
          verifierId: userSaveParams?.verifierId ?? 0,
          // ... the filter for the Project we want to update
        },
      });

      return { user };
    } catch (err) {
      console.error("Error: ", err);
      return { error: err };
    }
  }
}
