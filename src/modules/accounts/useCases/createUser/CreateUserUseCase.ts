import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    driver_license,
  }: IRequest): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
