import { EmailResponseDto } from "../../dtos/EmailDto";
import EmailModel from "../../models/EmailDataModel";

export default interface IEmailService {
  sendEmail(model: EmailModel): Promise<EmailResponseDto>;
}


