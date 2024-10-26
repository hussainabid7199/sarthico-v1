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
import UserDto from "../dtos/UserDto";
import IVerifyOTPService from "../services/interface/IVerifyOTPService";

@controller("/verify")
export class OTPController implements interfaces.Controller {
  private readonly _verifyOTPService: IVerifyOTPService;

  constructor(
    @inject(TYPES.IVerifyOTPService) verifyOTPService: IVerifyOTPService
  ) {
    this._verifyOTPService = verifyOTPService;
  }

  @httpPost("/otp")
  public async login(
    @request() req: Request,
    @response() res: Response
  ): Promise<UserDto | undefined> {
    const uniqueId = req.params.uniqueId;
    const otp: number = req.body.otp;
    try {
      const response = await this._verifyOTPService.verifyLoginOTP(
        uniqueId,
        otp
      );
      if (response && response.token) {
        res.status(200).send({
          success: true,
          message: "Verified",
        });
        return response;
      }
    } catch (error) {
      res.status(400).send({
        message: "Verified failed!",
        error: error,
      });
    }
  }
}
