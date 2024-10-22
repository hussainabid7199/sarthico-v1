"use-strict";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { IUserService } from "../services/interface/IUserService";
import { TYPES } from "../config-ioc/types";
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";
import validateSchema from "../middleware/validation.middleware";
import { Roles } from "../enums/role.enum";
import CategoryValidationSchema from "../schema/category.validation";
import { IEmailService } from "../services/interface/IEmailService";
import EmailOTPModel from "../models/EmailModel";

@controller("/email")
export class EmailController implements interfaces.Controller {
  private readonly _emailService: IEmailService;

  // Inject IUserService instead of UserController
  constructor(@inject(TYPES.IEmailService) emailService: IEmailService) {
    this._emailService = emailService;
  }

  @httpPost(
    "/otp"
  )
  public async sendEmail(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const model: EmailOTPModel = req.body;
    try {
      const response = await this._emailService.sendOTPEmail(model);
      console.log("response", response);
    } catch (error) {
      res.status(500).send({
        message: "Failed to send OTP email.",
        error: error
      });
    }
  }
}
