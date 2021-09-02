import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsDateProvider;
let rentalsRepository: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  const dayPlus1 = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider
    );
  });
  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "qwe-asdqwe-123123",
      car_id: "123123-qwe-asdqwe",
      expected_return_date: dayPlus1,
    });

    expect(rental).toHaveProperty("id");
    expect(rental.car_id).toBe("123123-qwe-asdqwe");
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
