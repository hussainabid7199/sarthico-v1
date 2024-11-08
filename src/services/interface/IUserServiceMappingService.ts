import Response from "../../dtos/Response";
import UserServiceMappingDto from "../../dtos/UserServiceMappingDto";
import UserServiceMappingModel from "../../models/UserServiceMappingModel";

export default interface IUserServiceMappingService {
  getAll(): Promise<Response<UserServiceMappingDto[]>>;
  update(id: number): Promise<UserServiceMappingDto>;
  delete(uniqueId: number): Promise<void>;
  create(model: UserServiceMappingModel): Promise<Response<UserServiceMappingDto>>;
}
