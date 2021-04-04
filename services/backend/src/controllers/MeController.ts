import BaseController, { IArgs } from "./BaseController";
import joi from "joi";
import { Container } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import { RoleService } from "./../services/RoleService";
import { logger } from "../utils/logger";

@Service()
export default class MeController extends BaseController {
  private roleService: RoleService;

  constructor(args: IArgs) {
    super(args);
    this.roleService = Container.get(RoleService);
  }

  private async me() {
    const user = await this.cv.getUser();
    this.ok({ user });
  }

  private meParams() {
    return joi.object({});
  }

  private async role() {
    const user = await this.cv.getUser();
    if (!user) {
      this.forbidden("Not logged in");
      return;
    }

    try {
      const role = await this.roleService.findByUser(user);
      this.ok({ role });
    } catch (error) {
      logger.error(error);
      this.notFound("Role not found");
    }
  }

  private roleParams() {
    return joi.object({});
  }
}
