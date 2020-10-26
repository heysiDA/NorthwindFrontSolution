import { Role } from '../role.enum';

export interface IAuthStatus {
  unique_name: string;
  role: Role;
  primarysid: number;
}


