import { injectable } from "inversify";
import  IUserService  from "./interface/IUserService";
import IMiscellaneousService from "./interface/IMiscellaneousService";

@injectable()
export default class MiscellaneousService implements IMiscellaneousService {
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
}
