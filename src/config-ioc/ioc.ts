"use-strict"
import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserService } from "../services/interface/IUserService";
import { UserService } from "../services/UserService";
import { EmailService } from "../services/EmailService";
import { IEmailService } from "../services/interface/IEmailService";


const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);

export { container };
