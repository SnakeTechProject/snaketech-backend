import { prisma as db } from '../../../lib/prisma';
import { IUser, IUserUpdate } from '../../../interfaces/userInterface';

export class UserRepository {
  async create({ id, email, name, password }: IUser) {
    const user = await db.user.create({
      data: {
        id,
        email,
        name,
        password,
      },
    });
    return user;
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

  async addRole(user_id: string, role_id: number) {
    await db.user_Role.create({
      data: {
        user_id,
        role_id,
      },
    });
  }
}
