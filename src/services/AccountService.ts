import { inject, injectable } from "inversify";
import IAccountService from "./interface/IAccountService";
import UserDto from "../dtos/UserDto";
import LoginModel from "../models/LoginModel";
import { RoleModel } from "../database/models/RoleModel";
import { Op } from "sequelize";
import BcryptUtils from "../utils/bcrypt.utils";
import { UserModel } from "../database/models/UserModel";
import RoleDto from "../dtos/RoleDto";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import { TYPES } from "../config-ioc/types";
import IEmailService  from "./interface/IEmailService";
import EmailModel, { EmailOTPModel } from "../models/EmailModel";
import { otpSignature } from "../helpers/Signature";
import sequelize from "../database/connection";

@injectable()
export default class AccountService implements IAccountService {
  private readonly _miscellaneousService: IMiscellaneousService;
  private readonly _emailService: IEmailService;

  constructor(
    @inject(TYPES.IMiscellaneousService)
    miscellaneousService: IMiscellaneousService,
    @inject(TYPES.IEmailService) emailService: IEmailService
  ) {
    this._miscellaneousService = miscellaneousService;
    this._emailService = emailService;
  }

  async login(model: LoginModel): Promise<{userId: string}> {
    
    const t = await sequelize.transaction();
    
    try {
      if (!model.username && !model.password) {
        throw new Error("Login credentials required");
      }

      const _user = await UserModel.findOne({
        include: RoleModel,
        where: {
          email: model.username,
          isActive: true,
          [Op.or]: [{ isDelete: null }, { isDelete: false }],
        },
      });

      if (!_user) {
        throw new Error("Invalid username or password");
      }

      const isPasswordValid = await BcryptUtils.comparePassword(
        model.password,
        _user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid username or password");
      }

      const otpResponse = this._miscellaneousService.generateOTP();

      // Hash OTP Response and save it to otp table with current user id use transaction here for saving the hashed otp

      if (otpResponse) {
        const _model: EmailOTPModel = {
          email: model.username,
          message: otpResponse,
        };
        const signatureResponse = otpSignature(_model);
        const emailData: EmailModel = {
          email: model.username,
          subject: "Complete Your Verification with OTP:-",
          message: signatureResponse,
        };

        const emailResponse = await this._emailService.sendEmail(emailData);

        if (!emailResponse) {
          throw new Error("Some error occurred!");
        }
      }

  
      return {
        userId:_user.userId
      };

    } catch (error) {
      throw new Error("Some error occurred!");
    }
  }

  register(model: UserModel): Promise<UserDto> {
    throw new Error("Method not implemented.");
  }
}
