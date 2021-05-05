import joi from "joi";
import fs from "fs";
import path from "path";
import BaseController from "./BaseController";
import { guideUploadDest } from "../constants";
import { logger } from "../utils/logger";

export default class GuidesController extends BaseController {
  private async uploadGuide() {
    const params = this.getParams();
    logger.info(`Guide with name: ${params.filename} was saved succesfully.`);
    this.ok({ filename: params.filename });
  }

  private uploadGuideParams() {
    return joi.object({
      filename: joi.string().required(),
    });
  }

  private downloadGuide() {
    const params = this.getParams();
    const filename = params.filename;
    const filePath = path.join(guideUploadDest, filename);
    const self = this;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        logger.error(`File at '${filePath}' does not exist...`);
        self.notFound("The requested file does not exist");
        return;
      }
      self.sendFileForDownload(filePath);
    });
  }

  private downloadGuideParams() {
    return joi.object({
      filename: joi.string().required(),
    });
  }
}
