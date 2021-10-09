import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import { rateLimiter } from "./middlewares/rateLimiter";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use(rateLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(router);

if (process.env.disk === "local") {
  app.use(express.static("tmp/cars"));
  app.use("/avatar", express.static("tmp/avatar"));
}

app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({ message: err.message });
  }

  response
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });

  next();
});

export { app };
