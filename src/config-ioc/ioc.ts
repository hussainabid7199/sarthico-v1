"use-strict"
import { Container } from "inversify";
import { TYPES } from "./types";



import IUserService  from "../services/interface/IUserService";
import IEmailService  from "../services/interface/IEmailService";
import IAccountService from "../services/interface/IAccountService";
import IMiscellaneousService from "../services/interface/IMiscellaneousService";
import IServiceService from "../services/interface/IServiceService";
import IUserServiceMappingService from "../services/interface/IUserServiceMappingService";

import  UserService  from "../services/UserService";
import  EmailService  from "../services/EmailService";
import  AccountService  from "../services/AccountService";
import  MiscellaneousService  from "../services/MiscellaneousService";
import IVerifyOTPService from "../services/interface/IVerifyOTPService";
import VerifyOTPService from "../services/VerifyOTPService";
import ServiceService from "../services/ServiceService";
import UserServiceMappingService from "../services/UserServiceMappingService";


const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
container.bind<IMiscellaneousService>(TYPES.IMiscellaneousService).to(MiscellaneousService);
container.bind<IVerifyOTPService>(TYPES.IVerifyOTPService).to(VerifyOTPService);
container.bind<IServiceService>(TYPES.IServiceService).to(ServiceService);
container.bind<IUserServiceMappingService>(TYPES.IUserServiceMappingService).to(UserServiceMappingService);

export { container };
