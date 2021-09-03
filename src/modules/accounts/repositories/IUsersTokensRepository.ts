import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  deleteById(id: string): Promise<void>;
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  create({
    expire_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
