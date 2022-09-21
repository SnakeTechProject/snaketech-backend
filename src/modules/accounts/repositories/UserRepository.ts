import { prisma as db, IUser } from '../../../lib/prisma';

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
        User_Role: {
          select: {
            Role: {
              select: {
                Permissions: {
                  select: {
                    Permission: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return user;
  }

  async update({ id, name, email, password }: IUser) {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
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
