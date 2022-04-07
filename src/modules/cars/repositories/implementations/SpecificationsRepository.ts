import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });
    await this.repository.save(specification);
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      name,
    });
    return new Specification;
  }
}

export { SpecificationsRepository };