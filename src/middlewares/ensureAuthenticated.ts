import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsesRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "0af0b64569cde8182e0235cb7243e817");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if (!user) throw new Error("User does not exists");

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}
