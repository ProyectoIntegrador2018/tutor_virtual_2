import joi from "joi";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { UserService } from "../services/UserService";
import { RoleService } from "../services/RoleService";
import { UserRoleName } from "../entities/RoleEntity";
import BaseController, { IArgs } from "./BaseController";
import { logger } from "../utils/logger";

@Service()
export default class UserController extends BaseController {
  userService: UserService;
  roleService: RoleService;

  constructor(args: IArgs) {
    super(args);
    this.userService = Container.get(UserService);
    this.roleService = Container.get(RoleService);
  }

  private async create() {
    const params = this.getParams();
    if (params.roleName === UserRoleName.SUPERADMIN) {
      logger.info("Viewer attempted to create a superadmin user!");
      return this.notAcceptable("Can't create a superadmin user!");
    }
    const role = await this.roleService.findOrCreate(params.roleName);
    const user = await this.userService.create({
      firstName: params.firstName,
      maternalName: params.maternalName,
      paternalName: params.paternalName,
      password: params.password,
      email: params.email,
      role,
    });
    logger.info(`User "${user.email}" succesfully registered!`);
    this.ok({ user });
  }

  private createParams() {
    return joi.object({
      firstName: joi.string().min(2).max(50).required(),
      paternalName: joi.string().min(2).max(50).required(),
      maternalName: joi.string().min(2).max(50).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(100).required(),
      confirmPassword: joi.any().valid(joi.ref("password")).required(),
      roleName: joi
        .string()
        .valid(...Object.keys(UserRoleName))
        .required(),
    });
  }

  private async users() {
    const result = await this.userService.findAll();
    this.ok({ users: result });
  }

  private usersParams() {
    return joi.object({});
  }
}
