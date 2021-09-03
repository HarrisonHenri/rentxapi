import { inject, injectable } from "tsyringe";

import { common } from "@config/common";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute(id: string): Promise<Rental> {
    const { minimumRentalDays } = common;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) throw new AppError("Rental not found");

    const dateNow = new Date();

    let daysPassed = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daysPassed <= 0) {
      daysPassed = minimumRentalDays;
    }

    const delay = this.dateProvider.compareInDays(dateNow, rental.start_date);
    const car = await this.carsRepository.findById(rental.car_id);

    let total = 0;

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += daysPassed * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.carsRepository.updateAccessibility(car.id, true);

    return this.rentalsRepository.create(rental);
  }
}

export { ReturnRentalUseCase };
