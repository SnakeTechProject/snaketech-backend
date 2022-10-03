import { prisma as db } from '../../../lib/prisma';
import { IChallenge, IChallengeUpdate } from '../../../interfaces/challengeInterface';

export class ChanllengeRepository {
  async create(data: IChallenge)  {
    await db.challenge.create({ data });
  }

  async findAll() {
    return await db.challenge.findMany();
  }

  async findOneByid(id: number) {
    const challenge = await db.challenge.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        author_id: true,
        author: {
          select: {
            name: true,
          }
        },
        title: true,
        description: true,
        difficulty: true,
        slug: true,
        created_at:true,
        updated_at:true,
      }
    });

    return challenge;
  }

  async findAllByParameters(parameters: string) {
    return await db.challenge.findMany({
      where: {
        OR: [
          {
            title: {
              contains: parameters
            }
          },
          {
            description: {
              contains: parameters
            }
          },
          {
            slug: {
              contains: parameters
            }
          },
          {
            author: {
              name: {
                contains: parameters
              }
            }
          },
          {
            difficulty: {
              contains: parameters
            }
          }
        ]
      },
      select: {
        author: {
          select: {
            id: true,
            name: true,
          }
        },
        title: true,
        description: true,
        slug: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: number, data: IChallengeUpdate) {
    await db.challenge.update({
      where: {
        id,
      },
      data: data
    });
  }

  async delete(id: number) {
    await db.challenge.delete({
      where: {
        id
      }
    });
  }
}
