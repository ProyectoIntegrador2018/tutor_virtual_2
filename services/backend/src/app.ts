import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { router } from "./routes";

export async function main() {
  const app = express();

  // ========== ROUTES ===========
  app.use("/v1", router);
  // =============================

  return app;
}
