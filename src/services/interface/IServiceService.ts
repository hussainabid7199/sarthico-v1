import ServiceDto from "../../dtos/ServiceDto";
import ServiceDataModel from "../../models/ServiceDataModel";
import Response from "../../dtos/Response";

export default interface IServiceService {
  get(): Promise<Response<ServiceDto[]>>;
  getById(id: number): Promise<Response<ServiceDto>>;
  update(id: number): Promise<ServiceDto>;
  delete(uniqueId: number): Promise<void>;
  create(model: ServiceDataModel): Promise<Response<ServiceDto>>;
  searchServices(searchTerm: string): Promise<ServiceDto[]>;
}
