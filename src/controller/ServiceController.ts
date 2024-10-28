"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from "inversify-express-utils";
import IUserService from "../services/interface/IUserService";
import { TYPES } from "../config-ioc/types";
import IServiceService from "../services/interface/IServiceService";
import ServiceDto from "../dtos/ServiceDto";
import { authorization } from "../middleware/authorization.middleware";
import { authentication } from "../middleware/authentication.middleware";
import validateSchema from "../middleware/validation.middleware";
import { Roles } from "../enums/role.enum";
import ServiceSchema from "../schema/ServiceSchema";

@controller("/service")
export class ServiceController implements interfaces.Controller {
  private readonly _serviceService: IServiceService;

  constructor(@inject(TYPES.IServiceService) serviceService: IServiceService) {
    this._serviceService = serviceService;
  }

  @httpGet("/")
  public async get(
    req: Request,
    res: Response
  ): Promise<Response<ServiceDto[]>> {
    try {
      const response = await this._serviceService.get();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve services." });
    }
  }

  @httpGet("/:id")
  public async getById(
    req: Request,
    res: Response
  ): Promise<Response<ServiceDto>> {
    try {
      const serviceResponse = await this._serviceService.getById(
        parseInt(req.params.id)
      );
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve service." });
    }
  }

  @httpPost("/",
    authentication,
    authorization([Roles.Administrator, Roles.Manager]),
    validateSchema(ServiceSchema)
  )
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<ServiceDto>> {
    try {
      const serviceResponse = await this._serviceService.create(req.body);
      return res.status(201).json(serviceResponse);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Failed to create service." });
    }
  }

  // @httpPut(
  //   "/:id",
    // authentication,
    // authorization([Roles.Administrator, Roles.Manager]),
    // validateSchema(CategoryValidationSchema)
  // )
  // public async updateCategory(
  //   @request() req: Request,
  //   @response() res: Response
  // ): Promise<void> {
  //   const categoryId = req.params.categoryId;
  //   // Call your update logic here
  //   res.send({
  //     message: `Category with ID ${categoryId} updated successfully`,
  //   });
  // }
}
