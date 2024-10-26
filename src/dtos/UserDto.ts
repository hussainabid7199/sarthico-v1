export default interface UserDto {
  uniqueId?: string;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdOn?: Date;
  token?: string;
}


