import BaseController from "./BaseController";
import joi from "joi";

export default class MeController extends BaseController {
  private async me() {
    const user = await this.cv.getUser();
    this.ok({ user });
  }

  private meParams() {
    return joi.object({});
  }
}
