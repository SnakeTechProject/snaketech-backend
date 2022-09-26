import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { jwt_secret } from '../../../config/vars';

import { HttpException } from './../../../errors/HttpException';
import { UserRepository } from './../repositories/UserRepository';
import Validator from '../../../helpers/validates-parameters';

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUser {
  private repo;

  constructor(repository: UserRepository) {
    this.repo = repository;
  }

  async execute(email: string, password: string): Promise<IResponse> {
    if (!Validator.isNotEmpty(email)) {
      throw new HttpException(400, 'Email is required');
    }

    if (!Validator.isNotEmpty(password)) {
      throw new HttpException(400, 'Password is required');
    }

    const user = await this.repo.findOneByEmail(email);

    if (!user) {
      throw new HttpException(401, 'Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(401, 'Email or password incorrect');
    }

    const permissions = user.User_Role.map((i) => {
      return i.Role.Permissions.map((i) => i.Permission.name);
    }).flat(1);

    const token = sign(
      { user_id: user.id, permissions: permissions },
      jwt_secret,
      { expiresIn: '1h' },
    );

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
