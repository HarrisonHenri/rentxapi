import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "@modules/rentals/useCase/returnRental/ReturnRentalController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.get(
  "/user",
  ensureAuthentication,
  listRentalsByUserController.handle
);
rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalsRoutes.post(
  "/return/:id",
  ensureAuthentication,
  returnRentalController.handle
);

export { rentalsRoutes };
