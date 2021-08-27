import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
