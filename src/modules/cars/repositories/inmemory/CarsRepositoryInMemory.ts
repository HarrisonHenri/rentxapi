import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    brand,
    name,
    category_id,
  }: IListCarDTO): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available === true &&
        (brand ? car.brand === brand : true) &&
        (name ? car.name === name : true) &&
        (category_id ? car.category_id === category_id : true)
    );
  }
}

export { CarsRepositoryInMemory };
