import { ChanllengeRepository } from '../repositories/ChallengeRepository';

export class FindAllChallenges {
  private challengeRepository;

  constructor (challengeRepository: ChanllengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async execute(): Promise<object> {
    return await this.challengeRepository.findAll();
  }
}
