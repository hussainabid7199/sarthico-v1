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
import  IEmailService  from "../services/interface/IEmailService";
import { EmailResponseDto } from "../dtos/EmailDto";
import EmailModel, { EmailOTPModel } from "../models/EmailDataModel";
import { otpSignature } from "../helpers/Signature";

@controller("/email")
export class EmailController implements interfaces.Controller {
  private readonly _emailService: IEmailService;

  constructor(@inject(TYPES.IEmailService) emailService: IEmailService) {
    this._emailService = emailService;
  }

  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  @httpPost("/otp")
  public async sendOTPEmail(
    @request() req: Request,
    @response() res: Response
  ): Promise<EmailResponseDto | undefined> {
    const model: EmailOTPModel = req.body;
    try {
      const result = this.generateOTP();
      model.message = result;
      model.subject = "Complete Your Verification with OTP:-"
     
      const signatureResponse = otpSignature(model);

      const emailData: EmailModel = {
        email: model.email,
        subject: model.subject,
        message: signatureResponse
      }

      return await this._emailService.sendEmail(emailData);

    } catch (error) {
      res.status(500).send({
        message: "Failed to send OTP email.",
        error: error
      });
    }
  }
}
