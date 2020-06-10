import { getRepository } from 'typeorm';

import Recipe from '../entity/Recipe';
import { DoesNotExistError } from '../errors';

interface IRecipeRepository {
  getRecipe(recipeId: number): Promise<Recipe>;
  getAllRecipe(): Promise<Recipe[]>;
  createRecipe(recipe: Recipe, userId: number): Promise<Recipe>;
  deleteRecipe(recipeId: number): Promise<boolean>;
  updateRecipe(recipeId: number, recipe: Recipe): Promise<Recipe>;
}

export default class RecipeRepository implements IRecipeRepository {
  readonly repo = getRepository(Recipe);

  async getRecipe(id: number): Promise<Recipe> {
    const relations = [
      'steps',
      'ingredients',
      'comments',
      'author',
      'categories',
    ];
    const recipe = await this.repo.findOne({
      where: { id },
      relations,
    });

    if (!recipe) {
      throw new DoesNotExistError(`Recipe with Id ${id} does not exist`);
    }
    return recipe;
  }

  async getAllRecipe(): Promise<Recipe[]> {
    const relations = ['steps', 'ingredients', 'author', 'categories'];
    return this.repo.find({ relations });
  }

  async createRecipe(recipe: Recipe, userId: number): Promise<Recipe> {
    recipe.author = userId;
    const newRecipe = await this.repo.save(recipe);
    return newRecipe;
  }

  async deleteRecipe(recipeId: number): Promise<boolean> {
    const recipe = await this.repo.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new DoesNotExistError(`Recipe with Id ${recipeId} does not exist`);
    }

    await this.repo.remove(recipe);
    return true;
  }

  async updateRecipe(recipeId: number, recipe: Recipe): Promise<Recipe> {
    const recipeExists = await this.repo.findOne(recipeId);
    if (!recipeExists) {
      throw new DoesNotExistError('Recipe with Id ${recipeId} does not exist');
    }
    recipe.id = recipeId;
    const updated = await this.repo.save(recipe, { reload: true });
    return updated;
  }
}
