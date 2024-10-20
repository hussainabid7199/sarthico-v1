import RoleDto from './RoleDto';

export default interface UserDto {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  timezoneId?: string;
  isActive: boolean;
  createdOn?: Date;
  roles?: RoleDto[];
  token: string | null;
}


