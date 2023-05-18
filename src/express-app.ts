import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import logger from "morgan";
import SuperAdminRoutes from "./Users/api/routes/index";

const expressConfig = async (app: Application) => {
  app.use(express.json());
  app.use(logger("dev"));
  app.use(cors());
  app.use(cookieParser());
  app.use("/api/super", SuperAdminRoutes);
};

export default expressConfig;
