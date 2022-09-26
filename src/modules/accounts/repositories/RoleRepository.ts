import { prisma as db } from '../../../lib/prisma';

export class RoleRepository {
  async create(name: string, description: string) {
    const role = await db.role.create({
      data: {
        name,
        description: description,
      },
    });

    return role;
  }

  async findByName(name: string) {
    const role = await db.role.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
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
    });

    return role;
  }

  async addPermission(permission_id: number, role_id: number) {
    const role_permission = await db.permission_Role.create({
      data: {
        permission_id,
        role_id,
      },
    });

    return role_permission;
  }
}
