import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/inmemory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });
  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification name",
      description: "Specification description",
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    const carWithSpecification = await carsRepositoryInMemory.findById(car.id);

    expect(carWithSpecification.specifications[0]).toEqual(specification);
  });
  it("should not be able to add specifications to a car that does not exists", () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "any",
        specifications_ids: [],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
