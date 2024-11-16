"use strict";
import { inject, injectable } from "inversify";
import IVerifyOTPService from "./interface/IVerifyOTPService";
import UserDto from "../dtos/UserDto";
import { UserModel } from "../database/models/UserModel";
import UserOTPModel from "../database/models/UserOTPModel";
import Response from "../dtos/Response";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import { TYPES } from "../config-ioc/types";
import { RoleModel } from "../database/models/RoleModel";

@injectable()
export default class VerifyOTPService implements IVerifyOTPService {

  private readonly _miscellaneousService: IMiscellaneousService;

  constructor(
    @inject(TYPES.IMiscellaneousService)
    miscellaneousService: IMiscellaneousService,
  ) {
    this._miscellaneousService = miscellaneousService;
  }


  async verifyLoginOTP(uniqueId: string, OTP: number): Promise<Response<UserDto>> {
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


    const tokenResponse = await this._miscellaneousService.generateToken(userResponse, roleResponse); 

    if(tokenResponse && tokenResponse.data && tokenResponse.success){
      return tokenResponse
    }else{
      throw new Error("Some error occurred!")
    }
  }
}
