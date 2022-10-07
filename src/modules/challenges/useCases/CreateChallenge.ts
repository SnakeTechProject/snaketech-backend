import { HttpException } from '../../../errors/HttpException';
import { IChallenge } from '../../../interfaces/challengeInterface';
import { ChanllengeRepository } from '../repositories/ChallengeRepository';
import { UserRepository } from '../../accounts/repositories/UserRepository';
import Validate from '../../../helpers/validates-parameters';
import urlSlug from 'url-slug';

export class CreateChallenge {
  private challengeRepository;
  private userRepository;

  constructor (
    challengeRepository: ChanllengeRepository,
    userRespository: UserRepository
  ) {
    this.challengeRepository = challengeRepository;
    this.userRepository = userRespository;
  }

  async execute({ author_id, title, description, difficulty }: IChallenge): Promise<void> {
    const missingData: string[] = [];

    if (!author_id) {
      missingData.push('author_id');
    }

    if (!title) {
      missingData.push('title');
    }

    if (!description) {
      missingData.push('description');
    }

    if (!difficulty) {
      missingData.push('difficulty');
    }

    if (missingData.length > 0) {
      throw new HttpException(400, `Missing required fields: ${missingData.join(', ')}`);
    }

    const invalidData = [];

    if (!Validate.isString(title)) {
      invalidData.push('title: title must be string');
    }

    if (!Validate.isString(description)) {
      invalidData.push('description: description must be string');
    }

    if (!Validate.isString(author_id)) {
      invalidData.push('author_id: author_id must be string');
    }

    if (!Validate.isString(difficulty)) {
      invalidData.push('difficult: difficult must be string');
    }

    if (!Validate.difficulty(difficulty)) {
      invalidData.push('difficult: difficult not exists');
    }

    if (invalidData.length > 0) {
      throw new HttpException(400, `Invalid fields: ${invalidData.join(', ')}`);
    }

    const now = new Date().getTime();
    const slug = urlSlug(title) + `-${now}`;

    const user = await this.userRepository.findOneById(author_id);

    if (!user) {
      throw new HttpException(400, 'user does not eexist');
    }

    await this.challengeRepository.create({
      author_id,
      title,
      description,
      slug: slug,
      difficulty
    });
  }
}
