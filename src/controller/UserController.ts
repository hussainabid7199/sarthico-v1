"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import IUserService from "../services/interface/IUserService";
import { TYPES } from "../config-ioc/types";
import UserDto from "../dtos/UserDto";
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Roles } from "../enums/role.enum";

@controller("/users")
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @httpGet("/", authentication, authorization([Roles.Administrator]))
  public async get(req: Request, res: Response): Promise<Response<UserDto[]>> {
    const response = await this._userService.get();
    if (response && response.data && response.success) {
      return res.status(200).json(response);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to retrieve users." });
    }
  }

  @httpGet("/:id", authentication, authorization([Roles.Administrator]))
  public getUser(req: Request, res: Response): void {
    const userId = req.params.id;
    const user = this._userService.getById(userId);
    res.send(user);
  }

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
