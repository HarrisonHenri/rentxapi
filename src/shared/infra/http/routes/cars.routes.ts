import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();

const uploadImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthentication,
  ensureUserIsAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureUserIsAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthentication,
  ensureUserIsAdmin,
  uploadImages.array("images"),
  uploadCarImageController.handle
);

export { carsRoutes };
