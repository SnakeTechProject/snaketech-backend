import { Role, Permission, Permission_Role } from '@prisma/client';

export const roles: Role[] = [
  {
    id: 1,
    name: 'admin',
    description: null,
    created_at: new Date(),
  },
  {
    id: 2,
    name: 'user',
    description: null,
    created_at: new Date(),
  },
];

export const permissions: Permission[] = [
  {
    id: 1,
    name: 'create:account',
    description: null,
    created_at: new Date(),
  },
  {
    id: 2,
    name: 'read:account',
    description: null,
    created_at: new Date(),
  },
  {
    id: 3,
    name: 'read:account:list',
    description: null,
    created_at: new Date(),
  },
  {
    id: 4,
    name: 'update:account',
    description: null,
    created_at: new Date(),
  },
  {
    id: 5,
    name: 'delete:account',
    description: null,
    created_at: new Date(),
  },
  {
    id: 6,
    name: 'create:comment',
    description: null,
    created_at: new Date(),
  },
  {
    id: 7,
    name: 'read:comment',
    description: null,
    created_at: new Date(),
  },
  {
    id: 8,
    name: 'update:comment',
    description: null,
    created_at: new Date(),
  },
  {
    id: 9,
    name: 'update:comment:others',
    description: null,
    created_at: new Date(),
  },
  {
    id: 10,
    name: 'delete:comment',
    description: null,
    created_at: new Date(),
  },
  {
    id: 11,
    name: 'create:challenge',
    description: null,
    created_at: new Date(),
  },
  {
    id: 12,
    name: 'read:challenge',
    description: null,
    created_at: new Date(),
  },
  {
    id: 13,
    name: 'update:challenge',
    description: null,
    created_at: new Date(),
  },
  {
    id: 14,
    name: 'delete:challenge',
    description: null,
    created_at: new Date(),
  },
  {
    id: 15,
    name: 'create:article',
    description: null,
    created_at: new Date(),
  },
  {
    id: 16,
    name: 'read:article',
    description: null,
    created_at: new Date(),
  },
  {
    id: 17,
    name: 'update:article',
    description: null,
    created_at: new Date(),
  },
  {
    id: 18,
    name: 'delete:article',
    description: null,
    created_at: new Date(),
  },
];

export const permission_role: Permission_Role[] = [
  { role_id: 1, permission_id: 3 },
  { role_id: 1, permission_id: 9 },
  { role_id: 1, permission_id: 15 },
  { role_id: 1, permission_id: 17 },
  { role_id: 1, permission_id: 18 },
  { role_id: 2, permission_id: 1 },
  { role_id: 2, permission_id: 2 },
  { role_id: 2, permission_id: 4 },
  { role_id: 2, permission_id: 5 },
  { role_id: 2, permission_id: 6 },
  { role_id: 2, permission_id: 7 },
  { role_id: 2, permission_id: 8 },
  { role_id: 2, permission_id: 10 },
  { role_id: 2, permission_id: 11 },
  { role_id: 2, permission_id: 12 },
  { role_id: 2, permission_id: 13 },
  { role_id: 2, permission_id: 14 },
  { role_id: 2, permission_id: 16 },
];
