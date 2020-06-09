import { Request, Response } from 'express';

import RecipeRepository from '../../db/repositories/RecipeRepository';
import { successResponse, errorResponse } from '../helpers';
import * as httpstatus from '../statuscodes';
import Recipe from '../../db/entity/Recipe';
import { DoesNotExistError } from '../../db/repositories/UserRepository';

export async function createRecipe(req: Request, res: Response) {
  const recipeRepository = new RecipeRepository();
  const userId = Number.parseInt(<string>req.headers['userId']);
  try {
    const recipe: Recipe = await recipeRepository.createRecipe(
      req.body,
      userId
    );
    successResponse(res, recipe, httpstatus.STATUS_CREATED);
  } catch (err) {
    return errorResponse(res, {
      message: 'Something weird happened',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

export async function partialUpdate(req: Request, res: Response) {
  const recipeRepository = new RecipeRepository();
  const userId = Number.parseInt(<string>req.headers['userId']);
  try {
    const recipe: Recipe = await recipeRepository.createRecipe(
      req.body,
      userId
    );
    successResponse(res, recipe, httpstatus.STATUS_OK);
  } catch (err) {
    return errorResponse(res, {
      message: 'Something weird happened',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

export async function getRecipe(req: Request, res: Response) {
  const recipeRepository = new RecipeRepository();
  const recipeId = Number.parseInt(req.params.recipeId);

  try {
    const recipe = await recipeRepository.getRecipe(recipeId);
    successResponse(res, recipe);
  } catch (err) {
    if (err instanceof DoesNotExistError) {
      return errorResponse(res, {
        message: err.message,
        code: httpstatus.STATUS_NOT_FOUND,
      });
    }
    return errorResponse(res, {
      message: 'Something weird happened',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

export async function getAllRecipes(req: Request, res: Response) {
  const recipeRepository = new RecipeRepository();
  try {
    const recipes = await recipeRepository.getAllRecipe();
    successResponse(res, recipes);
  } catch (err) {
    return errorResponse(res, {
      message: 'Something weird happened',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}

export async function deleteRecipe(req: Request, res: Response) {
  const recipeRepository = new RecipeRepository();
  const recipeId = Number.parseInt(req.params.recipeId);
  try {
    await recipeRepository.deleteRecipe(recipeId);
    successResponse(res, null, httpstatus.STATUS_NO_CONTENT);
  } catch (err) {
    if (err instanceof DoesNotExistError) {
      return errorResponse(res, {
        message: err.message,
        code: httpstatus.STATUS_NOT_FOUND,
      });
    }
    return errorResponse(res, {
      message: 'Something weird happened',
      code: httpstatus.STATUS_INTERNAL_SERVER_ERROR,
      error: err.stack,
    });
  }
}
