import dotenv from "dotenv";
import express from "express";

dotenv.config();

export async function main() {
  const app = express();
  return app;
}
