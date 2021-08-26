import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specifications";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }
}

export { SpecificationsRepository };
