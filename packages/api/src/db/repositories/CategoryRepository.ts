import { getRepository } from 'typeorm';

import Category from '../entity/Category';
import { DoesNotExistError } from '../errors';

interface ICategoryRespository {
  getAll(): Promise<Category[]>;
  createOrUpdate(category: Category): Promise<Category>;
  removeCategory(catId: number): Promise<boolean>;
}

export default class CategoryRepository implements ICategoryRespository {
  readonly repo = getRepository(Category);

  async getAll(): Promise<Category[]> {
    return this.repo.find();
  }

  async createOrUpdate(category: Category): Promise<Category> {
    return this.repo.save(category);
  }

  async removeCategory(catId: number): Promise<boolean> {
    const category = await this.repo.findOne(catId);
    if (!category) {
      throw new DoesNotExistError(`Category does not exist`);
    }
    await this.repo.remove(category);
    return true;
  }
}
