import UserDto from "../../dtos/UserDto";

export default interface IUserService {
  getUser(id: string): string;
}
