import { injectable } from "inversify";
import IUserService from "./interface/IUserService";
import IMiscellaneousService from "./interface/IMiscellaneousService";

@injectable()
export default class MiscellaneousService implements IMiscellaneousService {
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  checkOTPExpirationDuration(
    createdOn: string,
    durationInMinutes: number
  ): boolean {
    !durationInMinutes ? durationInMinutes == 5 : durationInMinutes;
    const createdDate = new Date(createdOn);
    const durationInMs = durationInMinutes * 60 * 1000;
    return new Date() >= new Date(createdDate.getTime() + durationInMs);
  }
}
