import { getRepository } from 'typeorm';

import Step from '../entity/Step';

interface IStepRepository {
  createStep(step: Step): Promise<Step>;
  createSteps(steps: Step[], recipeId: number): Promise<Step[]>;
}

export default class StepRepository implements IStepRepository {
  readonly repo = getRepository(Step);

  async createStep(step: Step): Promise<Step> {
    return this.repo.save(step);
  }

  async createSteps(steps: Step[], recipeId: number): Promise<Step[]> {
    const mSteps = steps.map(step => {
      step.recipeId = recipeId;
      return step;
    });
    return this.repo.save(mSteps);
  }
}
