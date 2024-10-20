"use-strict"
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPut, interfaces, request, response } from "inversify-express-utils";
import { IUserService } from "../interface/IUserService";
import { TYPES } from "../config/types";
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";
import validateSchema from "../middleware/validation.middleware";
import { Roles } from "../enums/role.enum";
import CategoryValidationSchema from "../schema/category.validation";

@controller("/users")
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  // Inject IUserService instead of UserController
  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @httpGet("/:id")
  public getUser(req: Request, res: Response): void {
    const userId = req.params.id;
    const user = this._userService.getUser(userId);
    res.send(user);
  }

  @httpPut(
    "/:id",
    authentication,
    authorization([Roles.Administrator, Roles.Manager]),
    validateSchema(CategoryValidationSchema)
  )
  public async updateCategory(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const categoryId = req.params.categoryId;
    // Call your update logic here
    res.send({
      message: `Category with ID ${categoryId} updated successfully`,
    });
  }
}
