import dotenv from "dotenv";
import express from "express";
import { exampleRouter } from "./routes";

dotenv.config();

export async function main() {
  const app = express();

  // ========== ROUTES ===========
  app.use("/v1", exampleRouter);
  // =============================

  return app;
}
