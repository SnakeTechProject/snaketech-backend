import { HttpException } from '../../../errors/HttpException';
import { IChallengeUpdate } from '../../../interfaces/challengeInterface';
import { ChanllengeRepository } from '../repositories/ChallengeRepository';
import Validate from '../../../helpers/validates-parameters';
import urlSlug from 'url-slug';

export class UpdateChallenge {
  private challengeRepository;

  constructor (challengeRepository: ChanllengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async execute(id: number, { title, description, difficulty, slug }: IChallengeUpdate): Promise<void> {
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

    if (title) {
      if (!Validate.isString(title)) {
        invalidData.push('title: title must be string');
      }
    }

    if (description) {
      if (!Validate.isString(description)) {
        invalidData.push('description: description must be string');
      }
    }

    if (difficulty) {
      if (!Validate.isString(difficulty)) {
        invalidData.push('difficult: difficult must be string');
      }
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const challenge = await this.challengeRepository.findOneByid(id);

    if (!challenge) {
      throw new HttpException(400, 'challenge does not eexist');
    }

    const titleExist = title;
    let createSlug = slug;

    if (titleExist) {
      createSlug = urlSlug(titleExist);
    }

    await this.challengeRepository.update(id, {
      title: title,
      slug: createSlug,
      description: description,
      difficulty: difficulty
    });
  }
}
