import multer from "multer";
import fs from "fs";
import { Request } from "express";
import { logger } from "../utils/logger";
import { guideUploadDest } from "../constants";

const getFilename = (req: Request) => {
  return req.header("storewithfilename") || req.body.filename;
};

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    const folderExists = fs.existsSync(guideUploadDest);
    if (!folderExists) {
      logger.info(
        `Folder for guides did not exist... creating folder at location: ${guideUploadDest}`
      );
      fs.mkdirSync(guideUploadDest, { recursive: true });
    }
    const filename = getFilename(req);
    logger.info(`Saving guide with filename: ${filename}`);
    cb(null, guideUploadDest);
  },
  filename: function (req, _file, cb) {
    const filename = getFilename(req);
    cb(null, filename);
  },
});

const uploader = multer({ storage });
const guideFileName = "guideForUser";
export const GuideFileUpload = () => {
  return uploader.single(guideFileName);
};
