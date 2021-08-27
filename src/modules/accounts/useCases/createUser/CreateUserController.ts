import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, driver_license } = request.body;

    const createCategoryUseCase = container.resolve(CreateUserUseCase);

    await createCategoryUseCase.execute({
      name,
      username,
      email,
      driver_license,
    });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
