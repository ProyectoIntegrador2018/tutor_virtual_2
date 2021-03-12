import BaseController, { IArgs } from "./BaseController";
import { Service } from "typedi";
import joi from "joi";
import { Container } from "typeorm-typedi-extensions";
import { UserRoleName } from "../entities/RoleEntity";
import { UserService } from "../services/UserService";
import * as argon2 from "argon2";
import addDays from "date-fns/addDays";
import { TokenMaker } from "../lib/TokenMaker";
import { logger } from "../utils/logger";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_EXPIRY_DAYS } from "../constants";

@Service()
export default class SessionsController extends BaseController {
  private userService: UserService;

  constructor(args: IArgs) {
    super(args);
    this.userService = Container.get(UserService);
  }

  async me() {
    const user = await this.cv.getUser();
    this.ok({ user });
  }

  private meParams() {
    return joi.object({});
  }

  private async login() {
    const params = this.getParams();
    const user = await this.userService.findOne(
      { email: params.email },
      { relations: ["role"] }
    );
    const notFoundMsg = "User does not exist.";
    if (!user) {
      return this.notFound(notFoundMsg);
    }
    const match = await argon2.verify(user.password, params.password);
    if (!match) {
      logger.info(
        `There was a failed attempt to login to user's "${user.email}" account.`
      );
      return this.notFound(notFoundMsg);
    }
    if (user.role.name !== UserRoleName.SUPERADMIN && !user.hasAccountEnabled) {
      return this.forbidden("Your account has not been enabled!");
    }
    const token = TokenMaker.buildLoginToken(user.id);
    this.setLoginCookieHeaders(token);
    logger.info(`User "${user.email}" logged in.`);
    this.ok({ user });
  }

  private loginParams() {
    return joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
  }

  // =========================== HELPER METHODS ============================
  private setLoginCookieHeaders(authToken: string) {
    const expiryDate = addDays(new Date(), AUTH_TOKEN_EXPIRY_DAYS);
    const cookieValue = `Bearer ${authToken}`;
    this.res.cookie(AUTH_COOKIE_NAME, cookieValue, {
      httpOnly: true,
      expires: expiryDate,
    });
  }
}
