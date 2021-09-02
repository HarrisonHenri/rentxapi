import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsDateProvider;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayPlus1 = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider,
      carsRepositoryInMemory
    );
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      brand: "Car brand",
      category_id: "123123-asdasde21i-8548",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "PQR-ZUM10",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "qwe-asdqwe-123123",
      car_id: car.id,
      expected_return_date: dayPlus1,
    });

    const updatedCar = await carsRepositoryInMemory.findById(car.id);

    expect(rental).toHaveProperty("id");
    expect(rental.car_id).toBe(car.id);
    expect(car.available).toBe(true);
    expect(updatedCar.available).toBe(false);
  });
  it("should not be able to create a new rental if the car is unavailable", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: dayPlus1,
      });

      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: dayPlus1,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new rental if the user has a rental in progress", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id_1",
        expected_return_date: dayPlus1,
      });

      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id_2",
        expected_return_date: dayPlus1,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new rental if the expected return date is invalid", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id_1",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
