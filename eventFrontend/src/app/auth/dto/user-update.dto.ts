import { Role } from "@shared/role.enum";

export interface UpdateUserDto {
  username?: string;
  password?: string;
  name?: string;
  surname?: string;
  email?: string;
  role?: Role;
}