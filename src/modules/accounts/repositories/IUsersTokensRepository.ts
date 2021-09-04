import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  deleteById(id: string): Promise<void>;
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
  create({
    expire_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UsersTokens>;
  findByRefreshToken(token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
