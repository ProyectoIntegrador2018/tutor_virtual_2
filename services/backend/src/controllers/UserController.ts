import joi from "joi";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { UserService } from "../services/UserService";
import BaseController, { IArgs } from "./BaseController";

@Service()
export default class UserController extends BaseController {
  userService: UserService;

  constructor(args: IArgs) {
    super(args);
    this.userService = Container.get(UserService);
  }

  private async users() {
    const result = await this.userService.findAll();
    this.ok({ users: result });
  }

  private usersParams() {
    return joi.object({});
  }
}
