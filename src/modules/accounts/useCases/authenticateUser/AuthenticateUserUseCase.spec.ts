import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      name: "User name",
      password: "123456",
      email: "user@email.com",
      driver_license: "123456789",
    };

    await createUserUseCase.execute(user);
    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
    expect(authentication.user.email).toBe(user.email);
  });
  it("should not be able to authenticate an user that does not exists", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "any@email.com",
        password: "any_password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrects"));
  });
  it("should not be able to authenticate an user with wrong password", async () => {
    const user = {
      name: "User name",
      password: "123456",
      email: "user@email.com",
      driver_license: "123456789",
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "any_password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrects"));
  });
});
