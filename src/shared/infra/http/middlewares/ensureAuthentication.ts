import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { common } from "@config/common";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthentication(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { auth } = common;

  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.refresh_token_secret);

    const user = await usersTokensRepository.findByUserAndRefreshToken(
      user_id as string,
      token
    );

    if (!user) throw new AppError("User does not exists", 401);

    request.user_id = user_id as string;

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
