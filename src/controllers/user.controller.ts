import { UserService } from "../services/user.service";
import {
  Controller,
  Post,
  Route,
  SuccessResponse,
  Security,
  Tags,
  Request,
} from "tsoa";

@Route("user")
@Tags("User")
export class UsersController extends Controller {

  @SuccessResponse("200")
  @Security("jwks", ["user"])
  @Post("verify")
  public async verify(@Request() req: any): Promise<any> {
    const userW3A = await new UserService().findOne(req.verifierId);
    // if pass per authentification return ok
    return Promise.resolve({ ...userW3A });
  }

}
