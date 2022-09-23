import { HttpException } from '../../../errors/HttpException';
import { UserRepository } from '../repositories/UserRepository';
import { IUserUpdate } from '../../../interfaces/userInterface';
import Validate from '../../../helpers/validates-parameters';
import { hash } from 'bcrypt';

export class UpdateUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(id: string, { name, email, password }: IUserUpdate): Promise<void> {
    const missingData: string[] = [];

    if (!Validate.isNotEmpty(id)) {
      missingData.push('id');
    }

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (!Validate.isString(id)) {
      invalidData.push('id: id must be a string');
    }

    if (name) {
      if (!Validate.isString(name)) invalidData.push('name: name must be a string');
    }

    if (email) {
      if (!Validate.isString(email)) invalidData.push('email: email must be a string');
      if (!Validate.email(email)) invalidData.push('email: email invalid format');
    }

    if (password) {
      if (!Validate.isString(password)) invalidData.push('password: password must be a string');
      if (password.length < 6) invalidData.push('password: password length invalid');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const user = await this.repository.findOneById(id);

    if(!user) {
      throw new HttpException(400, 'user does not exist');
    }

    let newPasswordHashed = password;

    if(newPasswordHashed) {
      newPasswordHashed = await hash(newPasswordHashed, 14);
    }

    await this.repository.update(id, {
      name: name,
      email: email,
      password: newPasswordHashed
    });
  }
}
