"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from "inversify-express-utils";
import { TYPES } from "../config-ioc/types";
import IUserServiceMappingService from "../services/interface/IUserServiceMappingService";
import UserServiceMappingDto from "../dtos/UserServiceMappingDto";
import UserServiceMappingModel from "../models/UserServiceMappingModel";
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Roles } from "../enums/role.enum";
import validateSchema from "../middleware/validation.middleware";
import UserServiceMappingSchema from "../schema/UserServiceMappingSchema";

@controller("/user/service")
export class UserServiceController implements interfaces.Controller {
  private readonly _userMappingService: IUserServiceMappingService;

  constructor(
    @inject(TYPES.IUserServiceMappingService)
    userMappingService: IUserServiceMappingService
  ) {
    this._userMappingService = userMappingService;
  }

  @httpGet("/")
  public async get(
    req: Request,
    res: Response
  ): Promise<Response<UserServiceMappingDto[]>> {
    const userMappingServiceResponse = await this._userMappingService.getAll();

    if (
      userMappingServiceResponse &&
      userMappingServiceResponse?.data &&
      userMappingServiceResponse?.data?.length > 0
    ) {
      return res.send(userMappingServiceResponse);
    } else {
      return res.status(404).send({ message: "No service found" });
    }
  }

  @httpPost(
    "/",
    authentication,
    authorization([Roles.ServiceProvider]),
    validateSchema(UserServiceMappingSchema)
  )
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<UserServiceMappingDto>> {
    const model: UserServiceMappingModel = req.body;
    const userMappingServiceResponse = await this._userMappingService.create(
      model
    );

    if (userMappingServiceResponse && userMappingServiceResponse?.data) {
      return res.status(201).send(userMappingServiceResponse);
    } else {
      return res.status(400).send(userMappingServiceResponse);
    }
  }

  //   @httpGet("/:id")
  //   public getUser(req: Request, res: Response): void {
  //     const userId = req.params.id;
  //     const user = this._userService.getUser(userId);
  //     res.send(user);
  //   }

  // @httpPut(
  //   "/:id",
  //   authentication,
  //   authorization([Roles.Administrator, Roles.Manager]),
  //   validateSchema(CategoryValidationSchema)
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
