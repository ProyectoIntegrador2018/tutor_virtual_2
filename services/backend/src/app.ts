import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import startTypeorm from "./modules/Typeorm";
import { router } from "./routes";
import { logger } from "./utils/logger";
import { __prod__, __dev__, __test__ } from "./constants";

export async function main() {
  logger.info("=====ENVIRONMENT=====");
  if (__prod__) {
    logger.info("Running in production mode 🦾.");
  } else if (__dev__) {
    logger.info("Running in dev mode 👩‍💻.");
  } else if (__test__) {
    logger.info("Running in test mode 👩‍🔬.");
  } else {
    logger.info("Running in unknown environment!!! 🤡");
  }

  try {
    const connection = await startTypeorm();
    logger.info("Running migrations...");
    await connection.runMigrations({
      transaction: "each",
    });
    logger.info("Succesfully ran migrations");
  } catch (error) {
    logger.error(error);
  }

  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      preflightContinue: true,
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );
  app.use(bodyParser.json());

  // ========== ROUTES ===========
  app.use("/v1", router);
  // =============================

  logger.info("🚀 Starting Backend");
  return app;
}
