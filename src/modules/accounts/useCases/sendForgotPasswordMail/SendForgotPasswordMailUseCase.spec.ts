import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { EtherialMailProviderInMemory } from "@shared/container/providers/MailProvider/inmemory/EtherialMailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: EtherialMailProviderInMemory;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new EtherialMailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot password mail to the user", async () => {
    const sendMailSpy = jest.spyOn(mailProvider, "sendMail");
    const generateTokenSpy = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    const user = {
      name: "User name",
      password: "123456",
      email: "user@email.com",
      driver_license: "123456789",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMailSpy).toHaveBeenCalled();
    expect(generateTokenSpy).toHaveBeenCalled();
  });
  it("should not be able to authenticate an user that does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("xablau@gmail.com")
    ).rejects.toEqual(new AppError("User not found"));
  });
});
