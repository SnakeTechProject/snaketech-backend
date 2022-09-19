import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

import { HttpException } from './../../../errors/HttpException';
import { UserRepository } from '../repositories/UserRepository';

export class CreateUser {
  private repo;

  constructor(repository: UserRepository) {
    this.repo = repository;
  }

  async execute(name: string, email: string, password: string): Promise<void> {
    const missingData: string[] = [];

    if (!name) {
      missingData.push('name');
    }

    if (!email) {
      missingData.push('email');
    }

    if (!password) {
      missingData.push('password');
    }

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (typeof name !== 'string') {
      invalidData.push('name');
    }

    // eslint-disable-next-line no-useless-escape
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      invalidData.push('email: invalid format');
    }

    if (typeof password !== 'string' || password.length < 6) {
      invalidData.push('password: minimum of 6 characters');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const user = await this.repo.findOneByEmail(email);

    if (user) {
      throw new HttpException(400, 'User already exists');
    }

    const id = randomUUID();

    const hashedPassword = await hash(password, 14);

    await this.repo.create({
      id,
      email,
      name,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
