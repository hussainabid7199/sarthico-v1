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
import { IEmailService } from "../services/interface/IEmailService";
import EmailOTPModel from "../models/EmailModel";
import { EmailResponseDto } from "../dtos/EmailDto";

@controller("/email")
export class EmailController implements interfaces.Controller {
  private readonly _emailService: IEmailService;

  constructor(@inject(TYPES.IEmailService) emailService: IEmailService) {
    this._emailService = emailService;
  }

  @httpPost("/otp")
  public async sendEmail(
    @request() req: Request,
    @response() res: Response
  ): Promise<EmailResponseDto | undefined> {
    const model: EmailOTPModel = req.body;
    try {
      const response = await this._emailService.sendOTPEmail(model);
      return response;
    } catch (error) {
      res.status(500).send({
        message: "Failed to send OTP email.",
        error: error
      });
    }
  }
}
