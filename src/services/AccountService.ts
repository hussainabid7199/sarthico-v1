import { inject, injectable } from "inversify";
import IAccountService from "./interface/IAccountService";
import UserDto from "../dtos/UserDto";
import LoginModel from "../models/LoginDataModel";
import BcryptUtils from "../utils/bcrypt.utils";
import { UserModel } from "../database/models/UserModel";
import IMiscellaneousService from "./interface/IMiscellaneousService";
import { TYPES } from "../config-ioc/types";
import IEmailService from "./interface/IEmailService";
import EmailModel, { EmailOTPModel } from "../models/EmailDataModel";
import { otpSignature } from "../helpers/Signature";
import sequelize from "../database/connection";
import UserOTPModel from "../database/models/UserOTPModel";
import { RoleModel } from "../database/models/RoleModel";
import Response from "../dtos/Response";

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

  async login(
    model: LoginModel
  ): Promise<Response<UserDto | { uniqueId: string }>> {
    const t = await sequelize.transaction();
    try {
      if (!model.username && !model.password) {
        throw new Error("Login credentials required");
      }

      const _user = await UserModel.findOne({
        where: {
          email: model.username,
          isActive: true,
          isDeleted: false,
        },
        raw: true,
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

      if (_user.is2FA) {
        const otpResponse = this._miscellaneousService.generateOTP();

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

          const otpData = {
            uniqueId: _user.uniqueId,
            otp: otpResponse,
            createdOn: new Date(),
          };

          const _userOTPResponse = await UserOTPModel.findOne({
            where: {
              uniqueId: _user.uniqueId,
            },
            raw: true,
          });

          if (
            _userOTPResponse &&
            _userOTPResponse.otp &&
            _userOTPResponse.createdOn
          ) {
            await UserOTPModel.update(otpData, {
              where: { uniqueId: otpData.uniqueId },
              transaction: t,
            });
          } else {
            !_userOTPResponse &&
              (await UserOTPModel.create(otpData as any, {
                transaction: t,
              }));
          }

          const emailResponse = await this._emailService.sendEmail(emailData);

          if (!emailResponse) {
            throw new Error("Some error occurred!");
          }

          await t.commit();

          if (_user.uniqueId) {
            return {
              success: true,
              data: {
                uniqueId: _user.uniqueId,
              },
            };
          } else {
            return {
              success: false,
              message: "Some error occured",
            };
          }
        }
      } else {
        await t.rollback();
        const roleResponse = await RoleModel.findOne({
          where: {
            roleId: _user?.roleId,
          },
          raw: true,
        });

        if (!roleResponse) {
          throw new Error("Invalid role!");
        }

        const tokenResponse = await this._miscellaneousService.generateToken(
          _user,
          roleResponse
        );

        if (tokenResponse && tokenResponse.data && tokenResponse.success) {
          return tokenResponse;
        }
      }
    } catch (error) {
      await t.rollback();
      throw new Error("Some error occurred!");
    }

    return {
      success: false,
      message: "Unexpected error: operation did not complete",
    };
  }

  register(model: UserModel): Promise<UserDto> {
    throw new Error("Method not implemented.");
  }
}
