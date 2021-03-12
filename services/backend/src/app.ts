import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import startTypeorm from "./modules/Typeorm";
import { router } from "./routes";
import { logger } from "./utils/logger";

export async function main() {
  try {
    await startTypeorm();
  } catch (error) {
    logger.error(error);
  }

  const app = express();
  app.use(bodyParser.json());

  // ========== ROUTES ===========
  app.use("/v1", router);
  // =============================

  logger.info("🚀 Starting Backend");
  return app;
}
