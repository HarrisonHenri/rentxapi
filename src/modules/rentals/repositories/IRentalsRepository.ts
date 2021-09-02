import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
  findByCar(car_id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
