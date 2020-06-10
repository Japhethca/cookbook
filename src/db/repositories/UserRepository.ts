import { getRepository } from 'typeorm';

import User from '../entity/User';
import { DoesNotExistError, AlreadyExistsError } from '../errors';

export default class UserRepository {
  readonly repo = getRepository(User);

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new DoesNotExistError(`user with email ${email} does not exist`);
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    if (await this.repo.findOne({ where: { email: user.email } })) {
      throw new AlreadyExistsError(
        `user with email ${user.email} already exists`
      );
    }
    const userEntity = this.repo.create(user);
    return this.repo.save(userEntity);
  }
}
