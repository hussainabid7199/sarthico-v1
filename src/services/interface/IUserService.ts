import UserDto from "../../dtos/UserDto";
import Response from "../../dtos/Response";

export default interface IUserService {
  get(): Promise<Response<UserDto[]>>;
  getById(id: string): Promise<Response<UserDto>>;
}
