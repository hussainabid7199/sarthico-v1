"use-strict"
import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserService } from "../interface/IUserService";
import { UserService } from "../services/UserService";


const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);

export { container };
