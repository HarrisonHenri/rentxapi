import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(express.static("tmp/cars"));
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
