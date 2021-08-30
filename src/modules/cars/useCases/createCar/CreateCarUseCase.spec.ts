import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new available Car", async () => {
    const car = {
      name: "Car name",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("id");
    expect(carCreated.name).toBe(car.name);
    expect(carCreated.available).toBeTruthy();
  });
  it("should not be able to create a Car with the same license_plate", () => {
    expect(async () => {
      const car1 = {
        name: "Car 1 name",
        description: "Car description",
        brand: "Car brand",
        category_id: "123123-asdasde21i-8548",
        daily_rate: 100,
        fine_amount: 10,
        license_plate: "PQR-ZUM10",
      };
      const car2 = {
        ...car1,
        name: "Car 2 name",
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
