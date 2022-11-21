import {
  Controller,
  Post,
  Route,
  SuccessResponse,
  Security,
  Tags,
} from "tsoa";

@Route("user")
@Tags("User")
export class UsersController extends Controller {

  @SuccessResponse("200")
  @Security("jwks", ["user"])
  @Post("verify")
  public async verify(): Promise<any> {
    // if pass per authentification return ok
    return { message: "ok" };
  }

}
