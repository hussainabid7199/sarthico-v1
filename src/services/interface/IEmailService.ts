import { EmailResponseDto } from "../../dtos/EmailDto";
import EmailModel from "../../models/EmailModel";

export interface IEmailService {
  sendEmail(model: EmailModel): Promise<EmailResponseDto>;
}
