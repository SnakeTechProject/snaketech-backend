import { HttpException } from '../../../errors/HttpException';
import { ChanllengeRepository } from '../repositories/ChallengeRepository';
import Validate from '../../../helpers/validates-parameters';

export class ReadChallenge {
  private challengeRepository;

  constructor (challengeRepository: ChanllengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async execute(id: number): Promise<object> {
    const missingData: string[] = [];

    if (!id) {
      missingData.push('id');
    }

    if (missingData.length > 0) {
      throw new HttpException(
        400,
        `Missing required fields: ${missingData.join(', ')}`,
      );
    }

    const invalidData = [];

    if (!Validate.isNumber(id)) {
      invalidData.push('id: id must be number');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const challenge = await this.challengeRepository.findOneByid(id);

    if (!challenge) {
      throw new HttpException(400, 'challenge does not exist');
    }

    return challenge;
  }
}
