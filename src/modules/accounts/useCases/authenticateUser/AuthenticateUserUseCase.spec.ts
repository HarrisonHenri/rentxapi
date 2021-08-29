import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usesRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usesRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usesRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usesRepositoryInMemory);
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
  it("should not be able to authenticate an user that does not exists", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "any@email.com",
        password: "any_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      const user = {
        name: "User name",
        password: "123456",
        email: "user@email.com",
        driver_license: "123456789",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "any_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
