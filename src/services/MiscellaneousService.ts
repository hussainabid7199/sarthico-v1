import { injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import Response from "../dtos/Response";
import UserDto from "../dtos/UserDto";
import { UserModel } from "../database/models/UserModel";
import config from "../jwt-config";
import { RoleModel } from "../database/models/RoleModel";

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

  async generateToken(
    model: UserModel,
    roleResponse: RoleModel
  ): Promise<Response<UserDto>> {

    if(!model && !roleResponse){
      throw new Error("Invalid user!")
    }

    const jwtSecret = config.jwt.secret;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const { userId, password, roleId, ...userWithoutPassword } = model;

    const token = await jwt.sign(
      {
        userId: model.userId,
        email: model.email,
        roleUniqueId: roleResponse.roleId,
        roleName: roleResponse.roleName,
        user: userWithoutPassword,
      },
      jwtSecret,
      {
        expiresIn: "1h",
        algorithm: "HS256",
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        notBefore: "0",
      }
    );

    const response = {
      uniqueId: model.uniqueId,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      isActive: model.isActive,
      token,
    };

    return {
      success: true,
      data: response,
    };
  }
}
