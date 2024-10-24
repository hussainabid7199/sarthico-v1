import RoleDto from "../dtos/RoleDto";

export default interface UserModel {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  roles?: RoleDto[];
}
