import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expire_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expire_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UserTokensRepository };
