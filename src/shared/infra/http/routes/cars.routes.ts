import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureUserIsAdmin,
  createCarController.handle
);

export { carsRoutes };
