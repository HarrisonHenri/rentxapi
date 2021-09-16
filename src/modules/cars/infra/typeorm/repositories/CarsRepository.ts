import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable({
    brand,
    name,
    category_id,
  }: IListCarDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .leftJoinAndSelect("cars.specifications", "specifications")
      .leftJoinAndSelect("cars.images", "images")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    return carsQuery.getMany();
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOne({ id });
  }

  async updateAccessibility(id: string, available: boolean): Promise<void> {
    this.repository
      .createQueryBuilder("cars")
      .update()
      .set({ available })
      .where("id = :id", { id })
      .execute();
  }
}

export { CarsRepository };
