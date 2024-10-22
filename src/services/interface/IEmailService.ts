import EmailOTPDto from "../../dtos/EmailDto";
import EmailOTPModel from "../../models/EmailModel";

export interface IEmailService {
  sendOTPEmail(model: EmailOTPModel): Promise<any>;
}
