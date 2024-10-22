import UserDto from "../../dtos/UserDto";

export interface IUserService {
  getUser(id: string): string;
}
