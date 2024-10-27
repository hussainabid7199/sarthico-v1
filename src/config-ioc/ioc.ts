"use-strict"
import { Container } from "inversify";
import { TYPES } from "./types";



import IUserService  from "../services/interface/IUserService";
import IEmailService  from "../services/interface/IEmailService";
import IAccountService from "../services/interface/IAccountService";
import IMiscellaneousService from "../services/interface/IMiscellaneousService";

import  UserService  from "../services/UserService";
import  EmailService  from "../services/EmailService";
import  AccountService  from "../services/AccountService";
import  MiscellaneousService  from "../services/MiscellaneousService";
import IVerifyOTPService from "../services/interface/IVerifyOTPService";
import VerifyOTPService from "../services/VerifyOTPService";


const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
container.bind<IMiscellaneousService>(TYPES.IMiscellaneousService).to(MiscellaneousService);
container.bind<IVerifyOTPService>(TYPES.IVerifyOTPService).to(VerifyOTPService);

export { container };
