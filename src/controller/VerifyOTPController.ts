"use strict";
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
import IVerifyOTPService from "../services/interface/IVerifyOTPService";

@controller("/verify")
export class OTPController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IVerifyOTPService) private readonly _verifyOTPService: IVerifyOTPService
  ) {}

  @httpPost("/otp")
  public async loginOTP(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const uniqueId = req.query.uniqueId as string;
    const otp = parseInt(req.body.otp);

    try {
      const response = await this._verifyOTPService.verifyLoginOTP(uniqueId, otp);
      res.status(200).json({
        message: "OTP verified successfully",
        response,
      });
    } catch (error: any) {
      console.error("Error during OTP verification:", error.message);

      if (error.message === "User not found." || error.message === "Invalid OTP") {
        res.status(400).json({ message: error.message });
      } else if (error.message === "OTP expired") {
        res.status(410).json({ message: "OTP expired" });
      } else {
        res.status(500).json({
          message: "OTP verification unsuccessful",
          error: error.message || "An unknown error occurred",
        });
      }
    }
  }
}
