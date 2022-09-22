import { prisma as db } from '../../../lib/prisma';
import { IUser, IUserUpdate } from '../../../interfaces/userInterface';

export class UserRepository {
  async create({ id, email, name, password }: IUser) {
    await db.user.create({
      data: {
        id,
        email,
        name,
        password,
      },
    });
  }

  async findOneByEmail(email: string) {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        created_at: true,
        updated_at: true,
        Comment: {
          select: {
            id: true,
          },
        },
        Article: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
        Likes: {
          select: {
            article: {
              select: {
                slug: true,
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async findOneById(id: string) {
    const user = await db.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        created_at: true,
        updated_at: true,
        Article: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
        Likes: {
          select: {
            article: {
              select: {
                slug: true,
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async update(id: string, data: IUserUpdate) {
    await db.user.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async delete(id: string) {
    await db.user.delete({
      where: {
        id,
      },
    });
  }
}
