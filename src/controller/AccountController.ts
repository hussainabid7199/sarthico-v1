"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { TYPES } from "../config-ioc/types";
import IAccountService from "../services/interface/IAccountService";
import LoginModel from "../models/LoginDataModel";
import UserDto from "../dtos/UserDto";
import sequelize from "../database/connection";
import { UserModel } from "../database/models/UserModel";
import BcryptUtils from "../utils/bcrypt.utils";
import { RoleModel } from "../database/models/RoleModel";
const { QueryTypes } = require("sequelize");

@controller("/account")
export class AccountController implements interfaces.Controller {
  private readonly _accountService: IAccountService;

  constructor(@inject(TYPES.IAccountService) accountService: IAccountService) {
    this._accountService = accountService;
  }

  @httpPost("/login")
  public async login(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const model: LoginModel = req.body;
    try {
      const response = await this._accountService.login(model);
      if (response && response.uniqueId) {
        res.status(200).send({
          message: "Login successful!",
          userId: response.uniqueId,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Try again!",
        error: error,
      });
    }
  }

  @httpPost("/register")
  public async register(
    @request() req: Request,
    @response() res: Response
  ): Promise<UserDto | undefined> {
    const t = await sequelize.transaction();
    try {
      const model = req.body as UserModel;
      const roleName = req.body.role as string;
      const confirmPassword = req.body.confirmPassword as string;

      const existingUser = await UserModel.findOne({
        where: { email: model.email },
        attributes: ["userId"],
      });

      if (existingUser) {
        throw new Error("Username already taken");
      }

      if(model.password !== confirmPassword){
        throw new Error("Invalid username or password");
      }

      const result = await sequelize.query(
        "SELECT roleId FROM roles WHERE roleName = :roleName",
        {
          replacements: { roleName },
          type: QueryTypes.SELECT,
        }
      );

      const roleId: number = (result[0] as unknown as { roleId: number })
        ?.roleId || 0;

      model.password = await BcryptUtils.hashPassword(model.password);
      model.isActive = true;
      model.roleId = roleId;

      // Create the user with a transaction
      const userResponse = await UserModel.create(model as any, {
        transaction: t,
      });

      const response: UserDto = {
        userId: userResponse.userId,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        phone: userResponse.phone,
        isActive: userResponse.isActive,
      };

      await t.commit();
      return response;
    } catch (error) {
      await t.rollback();
      res.status(400).json({
        success: false,
        message: "Registration unsuccessful!",
        error: error,
      });
    }
  }
}
