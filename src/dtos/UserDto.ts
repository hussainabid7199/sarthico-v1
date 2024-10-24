import RoleDto from './RoleDto';

export default interface UserDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdOn?: Date;
  roles?: RoleDto[];
  token: string | null;
}


