import { Request, Response } from 'express';

import { successResponse, serverError, errorResponse } from '../helpers';
import CategoryRepository from '../../db/repositories/CategoryRepository';
import { STATUS_NO_CONTENT, STATUS_NOT_FOUND } from '../statuscodes';
import { DoesNotExistError } from '../../db/errors';

export async function getCategories(req: Request, res: Response) {
  const categoryRepo = new CategoryRepository();
  try {
    const categories = await categoryRepo.getAll();
    successResponse(res, categories);
  } catch (err) {
    return serverError(res, err);
  }
}

export async function createOrUpdateCategory(req: Request, res: Response) {
  const categoryRepo = new CategoryRepository();
  try {
    const category = await categoryRepo.createOrUpdate(req.body);
    successResponse(res, category);
  } catch (err) {
    return serverError(res, err);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const categoryRepo = new CategoryRepository();
  const categoryId = Number.parseInt(req.params.categoryId);
  try {
    await categoryRepo.removeCategory(categoryId);
    successResponse(res, null, STATUS_NO_CONTENT);
  } catch (err) {
    if (err instanceof DoesNotExistError) {
      return errorResponse(res, {
        message: err.message,
        code: STATUS_NOT_FOUND,
      });
    }
    return serverError(res, err);
  }
}
