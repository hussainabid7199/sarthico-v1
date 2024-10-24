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
  ): Promise<UserDto | undefined> {
    const model: LoginModel = req.body;
    try {
      return await this._accountService.login(model)
    } catch (error) {
      res.status(500).send({
        message: "Failed to send OTP email.",
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
