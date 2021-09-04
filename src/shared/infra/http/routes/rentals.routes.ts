import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

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
