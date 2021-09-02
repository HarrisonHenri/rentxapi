import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const avatarFile = request.file.filename;

    const createUserUseCase = container.resolve(UpdateUserAvatarUseCase);

    await createUserUseCase.execute({
      user_id,
      avatarFile,
    });

    return response.status(200).send();
  }
}

export { UpdateUserAvatarController };
