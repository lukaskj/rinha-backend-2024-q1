import { Get, JsonController } from "routing-controllers";

@JsonController("/user")
export class UserController {
  @Get()
  index() {
    return "asd";
  }

  @Get("/aa")
  aa() {
    return "aa";
  }
}
