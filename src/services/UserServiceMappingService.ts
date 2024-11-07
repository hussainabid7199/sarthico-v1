import { injectable } from "inversify";
import IUserServiceMappingService from "./interface/IUserServiceMappingService";
import UserServiceMappingDto from "../dtos/UserServiceMappingDto";
import UserServiceMappingModel from "../models/UserServiceMappingModel";
import sequelize from "../database/connection";
import { UserServiceModel } from "../database/models/UserServiceModel";
import { ServiceModel } from "../database/models/ServiceModel";
import Response from "../dtos/Response";

@injectable()
export default class UserServiceMappingService
  implements IUserServiceMappingService
{
 async getAll(): Promise<Response<UserServiceMappingDto[]>> {
    const response = await UserServiceModel.findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
      attributes: ["uniqueId", "serviceId"],
      // include: [
      //   {
      //     model: ServiceModel,
      //     attributes: ["serviceName"],
      //   },
      // ],
    });

    if(response){
      return{
        success: true,
        data: response.map((item) => ({
          uniqueId: item.uniqueId,
          serviceName: item.serviceId.toString(),
        })),
      }
    }else{
      return{
        success: false,
        message: "Failed to retrieve user services.",
      }
    }
  }
  update(id: number): Promise<UserServiceMappingDto> {
    throw new Error("Method not implemented.");
  }
  delete(uniqueId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
 async create(
    model: UserServiceMappingModel
  ): Promise<Response<UserServiceMappingDto>> {
    const t = await sequelize.transaction();
    try {


        const existingUserService = await UserServiceModel.findOne({
          where: {
            userId: model.userId,
            serviceId: model.serviceId,
            isActive: true,
            isDeleted: false,
          },
        });

        if(existingUserService){
          return {
            success: false,
            message: "Services already exist.",
          };
        }

        
        const createdMapping = await UserServiceModel.create(model as any, {
            transaction: t,
        });

        const serviceResponse = await ServiceModel.findOne({
          where: {
            serviceId: model.serviceId,
          },
          attributes: ["serviceName"],
          order: [["serviceId", "ASC"]],
          raw: true
        })

        if(createdMapping && serviceResponse){
          await t.commit();
          return {
            success: true,
            data: {
              uniqueId: createdMapping.uniqueId,
              serviceName: serviceResponse.serviceName,
            },
          }
        }else{
          await t.rollback();
          return {
            success: false,
            message: "No services added",
          };
        }

    } catch (error) {
      console.log("error", error);
      await t.rollback();
      return {
        success: false,
        message: "No services added",
      };
    }
  }
}
