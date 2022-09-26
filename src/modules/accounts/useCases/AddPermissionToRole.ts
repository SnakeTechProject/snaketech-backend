import { PermissionRepository } from './../repositories/PermissionRepository';
import { RoleRepository } from './../repositories/RoleRepository';

export class AddPermissionToRole {
  private roleRepo;
  private permissionRepo;

  constructor(
    roleRepository: RoleRepository,
    permissionRepository: PermissionRepository,
  ) {
    this.roleRepo = roleRepository;
    this.permissionRepo = permissionRepository;
  }

  async execute() {
    console.log(
      '🚀 ~ file: AddPermissionToRole.ts ~ line 14 ~ AddPermissionToRole ~ execute ~ execute',
    );
  }
}
