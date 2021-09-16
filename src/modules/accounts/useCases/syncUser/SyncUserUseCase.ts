import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
  avatar: string;
}

@injectable()
class SyncUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, avatar }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found");
    }

    user.avatar = avatar;

    await this.usersRepository.create(user);

    return user;
  }
}

export { SyncUserUseCase };
