import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findById(id: string): Promise<Rental>;
  create({
    id,
    car_id,
    expected_return_date,
    user_id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental>;
  findByCar(car_id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
