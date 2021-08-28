import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "./database";

import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({ message: err.message });
  }

  response
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });

  next();
});

app.listen(3333);
