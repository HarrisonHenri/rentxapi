import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: car.brand,
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });
    const car2 = await carsRepositoryInMemory.create({
      ...car1,
      name: "Car 2",
      license_plate: "ABC-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car2.name });
    expect(cars).toEqual([car2]);
  });
  it("should be able to list all available cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });
    const car2 = await carsRepositoryInMemory.create({
      ...car1,
      name: "Car 2",
      license_plate: "ABC-1212",
    });
    await carsRepositoryInMemory.create({
      ...car1,
      name: "Car 3",
      license_plate: "1212-ABC",
      category_id: "123",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car1.category_id,
    });
    expect(cars).toEqual([car1, car2]);
  });
});
