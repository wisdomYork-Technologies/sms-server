import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import logger from "morgan";
import SuperAdminRoutes from "./superAdmin/api/routes/index";

const expressConfig = async (app: Application) => {
  app.use(express.json());
  app.use(logger("dev"));
  app.use(cors());
  app.use(cookieParser());
  app.use("/super", SuperAdminRoutes);
};

export default expressConfig;
