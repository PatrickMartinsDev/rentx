import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    //SELECT * FROM categories WHERE name = "name" limit 1
    //{} = WHERE
    const category = await this.repository.findOneOrFail({ name });
    return category;
  }
}

export { CategoriesRepository };
