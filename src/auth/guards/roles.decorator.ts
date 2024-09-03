import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  Patient = 'patient',
  Doctor = 'doctor',
  Nurse = 'nurse',
  Staff = 'staff',
}

export interface IUser {
  sub: string;
  role: Role;
  iat: number;
  exp: number;
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
