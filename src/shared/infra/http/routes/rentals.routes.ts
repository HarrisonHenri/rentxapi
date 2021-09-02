import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecase/createRental/CreateRentalController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle);

export { rentalsRoutes };
