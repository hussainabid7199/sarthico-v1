import { response } from "inversify-express-utils";
import { injectable } from "inversify";
import { IEmailService } from "./interface/IEmailService";
import EmailOTPModel from "../models/EmailModel";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import emailSignature from "../helpers/Signature";
import { EmailResponseDto, EmailSignature } from "../dtos/EmailDto";

@injectable()
export class EmailService implements IEmailService {
  async sendOTPEmail(model: EmailOTPModel): Promise<EmailResponseDto> {
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

    async function sendMail() {
      try {
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

        const emailContentData: EmailSignature = {
          name: "",
          position: "",
          contact: "",
          email: "",
          companyName: "",
          address: "",
          logo: "",
          message: model.message,
        };

        const emailContent = emailSignature(emailContentData);

        const mailOptions = {
          from: "cosarthi@gmail.com",
          to: model.email,
          subject: model.subject,
          text: model.message,
          html: emailContent,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
      } catch (error) {
        console.error("Error while sending email:", error);
        throw error; // re-throw the error to capture it in the caller
      }
    }

    try {
      const result = await sendMail();
      const emailResponse: EmailResponseDto = {
        messageId: result.messageId, 
        status: result.response,
      };
      return emailResponse;
    } catch (error) {
      console.log("Failed to send email:", error);
      throw new Error("Email sending failed"); // Optionally throw or handle error appropriately
    }
  }
}
