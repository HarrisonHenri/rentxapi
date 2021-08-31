import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListCarDTO } from "../dtos/IListCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findById(id: string): Promise<Car>;
  findAvailable({ brand, name, category_id }: IListCarDTO): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };
