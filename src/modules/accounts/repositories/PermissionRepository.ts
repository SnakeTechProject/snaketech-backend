import { prisma as db } from '../../../lib/prisma';

export class PermissionRepository {
  async create(name: string, description: string) {
    const permission = await db.permission.create({
      data: {
        name,
        description,
      },
    });

    return permission;
  }

  async findByName(name: string) {
    const permission = await db.permission.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
      },
    });

    return permission;
  }
}
