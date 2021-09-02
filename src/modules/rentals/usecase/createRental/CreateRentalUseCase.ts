import { inject, injectable } from "tsyringe";

import { common } from "@config/common";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const { minimumRentalHours } = common;

    const isCarRented = await this.rentalsRepository.findByCar(car_id);

    if (isCarRented) throw new AppError("Car unavailable");

    const userHasARent = await this.rentalsRepository.findByUser(user_id);

    if (userHasARent)
      throw new AppError("There is a rental in progress fot that user");

    const timeDifference = this.dateProvider.compareInHours(
      new Date(),
      expected_return_date
    );

    if (timeDifference < minimumRentalHours)
      throw new AppError("Invalid return time");

    await this.carsRepository.updateAccessibility(car_id, false);

    return this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });
  }
}

export { CreateRentalUseCase };
