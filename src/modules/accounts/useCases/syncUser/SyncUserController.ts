import { Request, Response } from "express";
import { container } from "tsyringe";

import { SyncUserUseCase } from "./SyncUserUseCase";

class SyncUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { avatar } = request.body;

    console.log(avatar);

    const syncUserUseCase = container.resolve(SyncUserUseCase);
    const user = await syncUserUseCase.execute({
      id: user_id,
      avatar,
    });

    return response.status(201).json(user);
  }
}

export { SyncUserController };
