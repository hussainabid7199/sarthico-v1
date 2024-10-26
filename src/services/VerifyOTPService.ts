import { injectable } from "inversify";
import IVerifyOTPService from "./interface/IVerifyOTPService";
import UserDto from "../dtos/UserDto";
import { UserModel } from "../database/models/UserModel";
import UserOTPModel from "../database/models/UserOTPModel";
import * as jwt from 'jsonwebtoken';
import config from "../jwt-config";

@injectable()
export default class VerifyOTPService implements IVerifyOTPService {
  async verifyLoginOTP(uniqueId: string, OTP: number): Promise<UserDto | undefined> {
    try {
      if (uniqueId && OTP) {
        const userResponse = await UserModel.findOne({
          where: {
            uniqueId: uniqueId,
            isActive: true,
            isDeleted: false,
          },
          raw: true,
        });

        if (!userResponse) {
          throw new Error("Some error occurred!");
        }

        const getOTPDetails = await UserOTPModel.findOne({
          where: {
            uniqueId: uniqueId,
          },
          raw: true,
        });

        const isTenMinutesPassed = (createdOn: string): boolean => {
          const createdDate = new Date(createdOn);
          const tenMinutesLater = new Date(
            createdDate.getTime() + 10 * 60 * 1000
          );
          const now = new Date();
          return now >= tenMinutesLater;
        };

        if (getOTPDetails && getOTPDetails.otp && getOTPDetails.createdOn) {
          const verifyExpirationTime = isTenMinutesPassed(
            getOTPDetails.createdOn.toString()
          );

          if (!verifyExpirationTime) {
            const jwtSecret = config.jwt.secret;

            if (!jwtSecret) {
              throw new Error("JWT_SECRET is not defined in environment variables");
            }

            const token = jwt.sign(
              {
                userId: userResponse.userId,
                email: userResponse.email,
                user: userResponse,
              },
              jwtSecret,
              {
                expiresIn: "1h",
                algorithm: "HS256",
                audience: config.jwt.audience,
                issuer: config.jwt.issuer,
                notBefore: "0", // Cannot use before now, can be configured to be deferred.
              }
            );

            const response: UserDto = {
              uniqueId: userResponse.uniqueId,
              firstName: userResponse.firstName,
              lastName: userResponse.lastName,
              email: userResponse.email,
              phone: userResponse.phone,
              isActive: userResponse.isActive,
              token: token,
            };

            return response
          } else {
            throw new Error("OTP Expired");
          }
        }
      }
    } catch (error) {
      throw new Error("Some error occurred!");
    }
  }
}
