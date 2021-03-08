import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { exampleRouter } from "./routes";

export async function main() {
  const app = express();

  // ========== ROUTES ===========
  app.use("/v1", exampleRouter);
  // =============================

  return app;
}
