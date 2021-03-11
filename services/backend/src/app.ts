import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import startTypeorm from "./modules/Typeorm";
import { router } from "./routes";
import { logger } from "./utils/logger";

dotenv.config();

export async function main() {
  try {
    await startTypeorm();
  } catch (error) {
    logger.error(error);
  }

  const app = express();

  // ========== ROUTES ===========
  app.use("/v1", router);
  // =============================

  logger.info("🚀 Starting Backend");
  return app;
}
