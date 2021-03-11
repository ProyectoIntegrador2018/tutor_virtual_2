import dotenv from "dotenv";
import express from "express";
import { router } from "./routes";

dotenv.config();

export async function main() {
  const app = express();

  // ========== ROUTES ===========
  app.use("/v1", router);
  // =============================

  return app;
}
