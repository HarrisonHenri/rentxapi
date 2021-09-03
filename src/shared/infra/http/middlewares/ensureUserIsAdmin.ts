import { Response, Request, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureUserIsAdmin(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { user_id } = request;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (!user.is_admin) throw new AppError("Unauthorized", 401);

  next();
}
