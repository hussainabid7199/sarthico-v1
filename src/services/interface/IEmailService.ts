import { EmailResponseDto } from "../../dtos/EmailDto";
import EmailModel from "../../models/EmailModel";

export default interface IEmailService {
  sendEmail(model: EmailModel): Promise<EmailResponseDto>;
}


