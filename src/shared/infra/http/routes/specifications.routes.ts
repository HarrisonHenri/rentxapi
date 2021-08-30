import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthentication,
  ensureUserIsAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
