import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { common } from "@config/common";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { auth } = common;

    const { email, sub } = verify(token, auth.refresh_token_secret) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError("Refresh token does not exists");

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const newToken = sign({}, auth.token_secret, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    const expire_date = this.dateProvider.addDays(
      auth.expires_in_refresh_token_in_days
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expire_date,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
