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
import LoginDto from "../dtos/LoginDto";
const { QueryTypes } = require("sequelize");
import LoginResponse from "../dtos/Response";

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

      if (response && response.data?.uniqueId) {
        const successResponse: LoginResponse<LoginDto> = {
          success: true,
          message: "Login successful!",
          data: {
            userId: response.data.uniqueId,
            message: "Verify your account.",
          },
        };
        res.status(200).send(successResponse);
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
  ): Promise<UserDto | void> {
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
        res.status(400).json({
          success: false,
          message: "Username already taken",
        });
        return;
      }

      if (model.password !== confirmPassword) {
        res.status(400).json({
          success: false,
          message: "Invalid username or password",
        });
        return;
      }

      const result = await sequelize.query(
        "SELECT roleId FROM roles WHERE roleName = :roleName",
        {
          replacements: { roleName },
          type: QueryTypes.SELECT,
        }
      );

      const roleId: number =
        (result[0] as unknown as { roleId: number })?.roleId || 0;

      model.password = await BcryptUtils.hashPassword(model.password);
      model.isActive = true;
      model.roleId = roleId;

      const userResponse = await UserModel.create(model as any, {
        transaction: t,
        raw: true,
      });

      const { token, ...response }: UserDto = userResponse.dataValues;

      await t.commit();
      res.status(201).json(response);
    } catch (error) {
      await t.rollback();
      res.status(400).json({
        success: false,
        message: "Some error occurred!",
        error: error,
      });
    }
  }
}
