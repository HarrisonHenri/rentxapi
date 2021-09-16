import { Router } from "express";
import multer from "multer";

import { upload } from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { SyncUserController } from "@modules/accounts/useCases/syncUser/SyncUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();

const uploadAvatar = multer(upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const syncUserController = new SyncUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.use(ensureAuthentication);

usersRoutes.post("/sync", syncUserController.handle);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
