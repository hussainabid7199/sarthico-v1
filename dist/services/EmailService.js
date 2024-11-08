"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
let EmailService = class EmailService {
    async sendEmail(model) {
        try {
            if (!model.email || !model.email.includes("@")) {
                throw new Error("Invalid or no recipient email(s) defined");
            }
            const CLIENT_ID = process.env.EMAIL_CLIENT_ID;
            const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
            const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI;
            const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
            const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
            const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
            // Set the refresh token
            oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
            // Retrieve a new access token using the refresh token
            const { token } = await oAuth2Client.getAccessToken();
            if (!token) {
                throw new Error("Failed to retrieve access token");
            }
            const transporter = nodemailer_1.default.createTransport({
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
            });
            const mailOptions = {
                from: "cosarthi@gmail.com",
                to: model.email,
                cc: model.cc,
                bcc: model.bcc,
                subject: model.subject,
                html: model.message || "",
            };
            const result = await transporter.sendMail(mailOptions);
            const emailResponse = {
                messageId: result.messageId,
                status: result.response,
            };
            return emailResponse;
        }
        catch (error) {
            console.error("Error while sending email:", error);
            throw new Error(`error: ${error}`);
        }
    }
};
EmailService = __decorate([
    (0, inversify_1.injectable)()
], EmailService);
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map