import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({
    name,
    username,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
