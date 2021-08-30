import { inject, injectable } from "tsyringe";

import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}
  async execute({ category_id, name, brand }: IListCarDTO): Promise<Car[]> {
    return this.carsRepository.findAvailable({ category_id, name, brand });
  }
}

export { ListAvailableCarsUseCase };
