"use strict";
import { inject, injectable } from "inversify";
import IVerifyOTPService from "./interface/IVerifyOTPService";
import UserDto from "../dtos/UserDto";
import { UserModel } from "../database/models/UserModel";
import UserOTPModel from "../database/models/UserOTPModel";
import * as jwt from 'jsonwebtoken';
import config from "../jwt-config";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import { TYPES } from "../config-ioc/types";
import { RoleModel } from "../database/models/RoleModel";

const jwtSecret = config.jwt.secret;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

@injectable()
export default class VerifyOTPService implements IVerifyOTPService {

  private readonly _miscellaneousService: IMiscellaneousService;

  constructor(
    @inject(TYPES.IMiscellaneousService)
    miscellaneousService: IMiscellaneousService,
  ) {
    this._miscellaneousService = miscellaneousService;
  }


  async verifyLoginOTP(uniqueId: string, OTP: number): Promise<UserDto> {
    if (!uniqueId || !OTP) {
      throw new Error("Invalid parameters provided.");
    }

    const userResponse = await UserModel.findOne({
      where: {
        uniqueId,
        isActive: true,
        isDeleted: false,
      },
      raw: true,
    });

    if (!userResponse) {
      throw new Error("User not found.");
    }

    const roleResponse = await RoleModel.findOne({
      where: {
        roleId: userResponse?.roleId
      },
      raw: true,
    })

    if (!roleResponse) {
      throw new Error("Invalid role!");
    }

    const getOTPDetails = await UserOTPModel.findOne({
      where: { uniqueId },
      raw: true,
    });

    if (!getOTPDetails || getOTPDetails.otp !== OTP.toString()) {
      throw new Error("Invalid OTP");
    }

    const isTenMinutesPassed = this._miscellaneousService.checkOTPExpirationDuration(getOTPDetails.createdOn.toString(), 10)

    if (isTenMinutesPassed) {
      throw new Error("OTP expired");
    }

    const jwtSecret = config.jwt.secret;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const {userId, password, roleId, ...userWithoutPassword } = userResponse;

    const token = jwt.sign(
      {
        userId: userResponse.userId,
        email: userResponse.email,
        roleUniqueId: roleResponse.uniqueId,
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

    return {
      uniqueId: userResponse.uniqueId,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      email: userResponse.email,
      phone: userResponse.phone,
      isActive: userResponse.isActive,
      token,
    };
  }
}
