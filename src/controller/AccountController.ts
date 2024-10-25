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
import LoginModel from "../models/LoginModel";
import UserDto from "../dtos/UserDto";
import config from "../jwt-config";
import * as jwt from "jsonwebtoken";
import RoleDto from "../dtos/RoleDto";

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
      if (response && response.userId) {
        res.status(200).send({
          message: "Login successful!",
          userId: response.userId
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
    throw new Error("Method not implemented.");
  }
}
