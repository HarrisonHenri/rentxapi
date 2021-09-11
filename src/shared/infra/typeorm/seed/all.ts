import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const userPassword = await hash("xablau", 10);

  const carId1 = uuidV4();
  const carId2 = uuidV4();
  const carId3 = uuidV4();
  const carId4 = uuidV4();
  const specification1 = uuidV4();
  const specification2 = uuidV4();
  const specification3 = uuidV4();
  const specification4 = uuidV4();
  const specification5 = uuidV4();
  const specification6 = uuidV4();
  const specification7 = uuidV4();
  const specification8 = uuidV4();
  const specification9 = uuidV4();
  const specification10 = uuidV4();
  const specification11 = uuidV4();
  const specification12 = uuidV4();
  const specification13 = uuidV4();
  const specification14 = uuidV4();

  const cars = [
    {
      id: carId1,
      name: "124 Spider",
      description:
        "O 124 Spider é equipado com o motor 1.4 MultiAir de 166 cv e 25,4 kgfm na versão Abarth, com turbo e sistema de controle elétrico de válvulas.",
      daily_rate: Math.floor(Math.random() * 1000),
      fine_amount: Math.floor(Math.random() * 100),
      available: true,
      brand: "FIAT",
      license_plate: "ABC-123",
    },
    {
      id: carId2,
      name: "300 CE",
      description: "",
      daily_rate: Math.floor(Math.random() * 1000),
      fine_amount: Math.floor(Math.random() * 100),
      available: true,
      brand: "Mercedes-Benz",
      license_plate: `ABC-321`,
    },
    {
      id: carId3,
      name: "4Runner",
      description:
        "O Toyota 4Runner é um veículo utilitário esportivo compacto, posteriormente de médio porte, produzido pelo fabricante japonês Toyota e vendido em todo o mundo de 1984 até o presente.",
      daily_rate: Math.floor(Math.random() * 1000),
      fine_amount: Math.floor(Math.random() * 100),
      available: true,
      brand: "Toyota",
      license_plate: `CBA-OASK`,
    },
    {
      id: carId4,
      name: "7 Series",
      description:
        "O BMW 7 series representa a compreensão do conceito de luxo moderno por parte da marca BMW.",
      daily_rate: Math.floor(Math.random() * 1000),
      fine_amount: Math.floor(Math.random() * 100),
      available: true,
      brand: "BMW",
      license_plate: "BAC-1321",
    },
  ];

  const specifications = [
    {
      id: specification1,
      name: "250 km/h",
      description: "speed",
    },
    {
      id: specification2,
      name: "3s",
      description: "acceleration",
    },
    {
      id: specification3,
      name: "700 HP",
      description: "turning_diameter",
    },
    {
      id: specification4,
      name: "Elétrico",
      description: "eletric_motor",
    },
    {
      id: specification5,
      name: "AUTO",
      description: "exchange",
    },
    {
      id: specification6,
      name: "3 pessoas",
      description: "seats",
    },
    {
      id: specification7,
      name: "210 km/h",
      description: "speed",
    },
    {
      id: specification8,
      name: "3.1s",
      description: "acceleration",
    },
    {
      id: specification9,
      name: "900 HP",
      description: "turning_diameter",
    },
    {
      id: specification10,
      name: "Gasolina",
      description: "gasoline_motor",
    },
    {
      id: specification11,
      name: "350 km/h",
      description: "speed",
    },
    {
      id: specification12,
      name: "1.5s",
      description: "acceleration",
    },
    {
      id: specification13,
      name: "1000 HP",
      description: "turning_diameter",
    },
    {
      id: specification14,
      name: "2 pessoas",
      description: "seats",
    },
  ];

  const specificationsCars = [
    {
      car_id: carId1,
      specification_id: specification1,
    },
    {
      car_id: carId1,
      specification_id: specification2,
    },
    {
      car_id: carId1,
      specification_id: specification3,
    },
    {
      car_id: carId1,
      specification_id: specification4,
    },
    {
      car_id: carId1,
      specification_id: specification5,
    },
    {
      car_id: carId1,
      specification_id: specification6,
    },
    {
      car_id: carId2,
      specification_id: specification7,
    },
    {
      car_id: carId2,
      specification_id: specification8,
    },
    {
      car_id: carId2,
      specification_id: specification9,
    },
    {
      car_id: carId2,
      specification_id: specification10,
    },
    {
      car_id: carId2,
      specification_id: specification5,
    },
    {
      car_id: carId2,
      specification_id: specification14,
    },
    {
      car_id: carId3,
      specification_id: specification11,
    },
    {
      car_id: carId3,
      specification_id: specification12,
    },
    {
      car_id: carId3,
      specification_id: specification13,
    },
    {
      car_id: carId3,
      specification_id: specification4,
    },
    {
      car_id: carId3,
      specification_id: specification5,
    },
    {
      car_id: carId3,
      specification_id: specification14,
    },
    {
      car_id: carId4,
      specification_id: specification1,
    },
    {
      car_id: carId4,
      specification_id: specification2,
    },
    {
      car_id: carId4,
      specification_id: specification3,
    },
    {
      car_id: carId4,
      specification_id: specification4,
    },
    {
      car_id: carId4,
      specification_id: specification5,
    },
    {
      car_id: carId4,
      specification_id: specification6,
    },
  ];

  await connection.query(`
    INSERT INTO USERS(
      id, name, email, password,
      is_admin, driver_license, created_at
    ) values (
      '${uuidV4()}', 'Xablau', 'xablau@provider.com.br', '${userPassword}',
      false, '132812748324', 'now()'
    )
  `);

  // eslint-disable-next-line no-restricted-syntax
  for (const specification of specifications) {
    // eslint-disable-next-line no-await-in-loop
    await connection.query(`
    INSERT INTO specifications(
      id, name, description, created_at
    ) values (
      '${specification.id}', '${specification.name}', '${specification.description}', 'now()'
    )
  `);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const car of cars) {
    // eslint-disable-next-line no-await-in-loop
    await connection.query(`
    INSERT INTO CARS(
      id, name, description, daily_rate,
      available, license_plate, fine_amount, brand, created_at
    ) values (
      '${car.id}', '${car.name}', '${car.description}', '${car.daily_rate}',
      '${car.available}', '${car.license_plate}', '${car.fine_amount}', '${car.brand}', 'now()'
    )
  `);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const specificationsCar of specificationsCars) {
    // eslint-disable-next-line no-await-in-loop
    await connection.query(`
      INSERT INTO SPECIFICATIONS_CARS(
        car_id, specification_id, created_at
      ) values (
        '${specificationsCar.car_id}', '${specificationsCar.specification_id}', 'now()'
      )
    `);
  }

  await connection.close();
}

create().then(() => {
  console.log("✅ Data created");
});
