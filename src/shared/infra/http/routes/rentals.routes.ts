import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecase/createRental/CreateRentalController";
import { ReturnRentalController } from "@modules/rentals/usecase/returnRental/ReturnRentalController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalsRoutes.post(
  "/return/:id",
  ensureAuthentication,
  returnRentalController.handle
);

export { rentalsRoutes };
