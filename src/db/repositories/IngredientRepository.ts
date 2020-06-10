import { getRepository } from 'typeorm';

import Recipe from '../entity/Recipe';
import { DoesNotExistError } from '../errors';

export default class RecipeRepository {
  readonly repo = getRepository(Recipe);

  async getRecipe(recipeId: number): Promise<Recipe> {
    const recipe = await this.repo.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new DoesNotExistError('Recipe does not exist');
    }
    return recipe;
  }

  async getAllRecipe(): Promise<Recipe[]> {
    return this.repo.find();
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const recipeSchema = this.repo.create(recipe);
    const newRecipe = await this.repo.save(recipeSchema);
    return newRecipe;
  }

  // async updateRecipe(recipe: Recipe): Promise<Recipe> {
  // const oldRecipe = await this.getRecipe(recipe.id);
  // this.repo.update('sdfds', {});
  // }
}
