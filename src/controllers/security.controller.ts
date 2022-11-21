// DON'T NEEDED FOR NOW

import { Get, Route, Security, Response, Request } from "tsoa";

@Route("secure")
export class SecureController {
//   @Response<ErrorResponseModel>("Unexpected error")
  @Response<any>(500)
  @Security("api_key")
  @Get("UserInfo")
//   public async userInfo(@Request() request: any): Promise<UserResponseModel> {
    public async userInfo(@Request() request: any): Promise<any> {
    return Promise.resolve(request.user);
  }

  @Security("jwt", ["admin"])
  @Get("EditUser")
  public async editUserInfo(@Request() request: any): Promise<any> {
    // public async userInfo(@Request() request: any): Promise<string> {
    // Do something here
    console.log(request.user);
  }
}
