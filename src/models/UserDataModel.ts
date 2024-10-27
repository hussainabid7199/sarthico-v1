import RoleDto from "../dtos/RoleDto";

export default interface UserDataModel {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  roles?: RoleDto[];
}
