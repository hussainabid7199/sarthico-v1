import Response from "../dtos/Response";
import { injectable } from "inversify";
import IServiceService from "./interface/IServiceService";
import ServiceDto from "../dtos/ServiceDto";
import ServiceDataModel from "../models/ServiceDataModel";
import { ServiceModel } from "../database/models/ServiceModel";
import ServiceSchema from "../schema/ServiceSchema";
import sequelize from "../database/connection";

@injectable()
export default class ServiceService implements IServiceService {
  async get(): Promise<Response<ServiceDto[]>> {
    const serviceResponse = await ServiceModel.findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
      attributes: ["uniqueId", "serviceId", "serviceName"],
      order: [["serviceId", "ASC"]],
      raw: true,
    });

    if (serviceResponse && serviceResponse.length > 0) {
      return {
        success: true,
        data: serviceResponse,
      };
    } else {
      return {
        success: false,
        data: [],
        message: "No services found",
      };
    }
  }
  async getById(id: number): Promise<Response<ServiceDto>> {
    const serviceResponse = await ServiceModel.findOne({
      where: {
        id,
        isActive: true,
        isDeleted: false,
      },
      attributes: ["uniqueId", "serviceId", "serviceName"],
      order: [["serviceId", "ASC"]],
      raw: true,
    });

    if (serviceResponse) {
      return {
        success: true,
        data: serviceResponse,
      };
    } else {
      return {
        success: false,
        message: "No services found",
      };
    }
  }
  update(id: number): Promise<ServiceDto> {
    throw new Error("Method not implemented.");
  }
  delete(uniqueId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(model: ServiceDataModel): Promise<Response<ServiceDto>> {
    const t = await sequelize.transaction();
    try {
      const validatedData = await ServiceSchema.validate(model, {
        abortEarly: false,
      });

      if (!validatedData) {
        throw new Error("Validation failed");
      }

      const createdService = await ServiceModel.create(model as any, {
        transaction: t,
        attributes: ["uniqueId", "serviceId", "serviceName"],
        order: [["serviceId", "ASC"]],
        raw: true
      });

      const serviceResponse = {
        uniqueId: createdService.dataValues.uniqueId,
        serviceId: createdService.dataValues.serviceId,
        serviceName: createdService.dataValues.serviceName,
      };

      if (serviceResponse) {
        await t.commit();
        return {
          success: true,
          data: serviceResponse,
        };
      } else {
        await t.rollback();
        return {
          success: false,
          message: "No services ",
        };
      }
    } catch (error) {
      await t.rollback();
      return {
        success: false,
        message: "No services found",
      };
    }
  }
  searchServices(searchTerm: string): Promise<ServiceDto[]> {
    throw new Error("Method not implemented.");
  }
}
