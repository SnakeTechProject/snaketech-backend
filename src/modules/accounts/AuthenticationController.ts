import { Request, Response } from 'express';
import { UserRepository } from './repositories/UserRepository';
import { AuthenticateUser } from './useCases/AuthenticateUser';

export class AuthenticationController {
  async createToken(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = new UserRepository();
    const authenticateUserUseCase = new AuthenticateUser(userRepository);

    const tokenData = await authenticateUserUseCase.execute(email, password);

    return res.json(tokenData);
  }
}
