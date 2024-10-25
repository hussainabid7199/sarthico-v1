import { injectable } from "inversify";
import  IEmailService  from "./interface/IEmailService";
import { EmailOption } from "../models/EmailModel";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EmailResponseDto } from "../dtos/EmailDto";
import EmailModel from "../models/EmailModel";

@injectable()
export default class EmailService implements IEmailService {
  async sendEmail(model: EmailModel): Promise<EmailResponseDto> {
    try {
      if (!model.email || !model.email.includes("@")){
        throw new Error("Invalid or no recipient email(s) defined");
      }

      const CLIENT_ID = process.env.EMAIL_CLIENT_ID;
      const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
      const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI;
      const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
      const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";

      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );

      // Set the refresh token
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      // Retrieve a new access token using the refresh token
      const { token } = await oAuth2Client.getAccessToken();

      if (!token) {
        throw new Error("Failed to retrieve access token");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "cosarthi@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: token,
        },
        tls: {
          rejectUnauthorized: true,
        },
      } as nodemailer.TransportOptions);

      const mailOptions: EmailOption = {
        from: "cosarthi@gmail.com",
        to: model.email,
        cc: model.cc,
        bcc: model.bcc,
        subject: model.subject,
        html: model.message || "",
      };

      const result = await transporter.sendMail(mailOptions);
      const emailResponse: EmailResponseDto = {
        messageId: result.messageId,
        status: result.response,
      };
      return emailResponse;
    } catch (error) {
      console.error("Error while sending email:", error);
      throw new Error(`error: ${error}`);
    }
  }
}
