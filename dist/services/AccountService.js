"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const bcrypt_utils_1 = __importDefault(require("../utils/bcrypt.utils"));
const UserModel_1 = require("../database/models/UserModel");
const types_1 = require("../config-ioc/types");
const Signature_1 = require("../helpers/Signature");
const connection_1 = __importDefault(require("../database/connection"));
const UserOTPModel_1 = __importDefault(require("../database/models/UserOTPModel"));
const RoleModel_1 = require("../database/models/RoleModel");
let AccountService = class AccountService {
    _miscellaneousService;
    _emailService;
    constructor(miscellaneousService, emailService) {
        this._miscellaneousService = miscellaneousService;
        this._emailService = emailService;
    }
    async login(model) {
        const t = await connection_1.default.transaction();
        try {
            if (!model.username && !model.password) {
                throw new Error("Login credentials required");
            }
            const _user = await UserModel_1.UserModel.findOne({
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
            const isPasswordValid = await bcrypt_utils_1.default.comparePassword(model.password, _user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid username or password");
            }
            if (_user.is2FA) {
                const otpResponse = this._miscellaneousService.generateOTP();
                if (otpResponse) {
                    const _model = {
                        email: model.username,
                        message: otpResponse,
                    };
                    const signatureResponse = (0, Signature_1.otpSignature)(_model);
                    const emailData = {
                        email: model.username,
                        subject: "Complete Your Verification with OTP:-",
                        message: signatureResponse,
                    };
                    const otpData = {
                        uniqueId: _user.uniqueId,
                        otp: otpResponse,
                        createdOn: new Date(),
                    };
                    const _userOTPResponse = await UserOTPModel_1.default.findOne({
                        where: {
                            uniqueId: _user.uniqueId,
                        },
                        raw: true,
                    });
                    if (_userOTPResponse &&
                        _userOTPResponse.otp &&
                        _userOTPResponse.createdOn) {
                        await UserOTPModel_1.default.update(otpData, {
                            where: { uniqueId: otpData.uniqueId },
                            transaction: t,
                        });
                    }
                    else {
                        !_userOTPResponse &&
                            (await UserOTPModel_1.default.create(otpData, {
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
                    }
                    else {
                        return {
                            success: false,
                            message: "Some error occured",
                        };
                    }
                }
            }
            else {
                await t.rollback();
                const roleResponse = await RoleModel_1.RoleModel.findOne({
                    where: {
                        roleId: _user?.roleId,
                    },
                    raw: true,
                });
                if (!roleResponse) {
                    throw new Error("Invalid role!");
                }
                const tokenResponse = await this._miscellaneousService.generateToken(_user, roleResponse);
                if (tokenResponse && tokenResponse.data && tokenResponse.success) {
                    return tokenResponse;
                }
            }
        }
        catch (error) {
            await t.rollback();
            throw new Error("Some error occurred!");
        }
        return {
            success: false,
            message: "Unexpected error: operation did not complete",
        };
    }
    register(model) {
        throw new Error("Method not implemented.");
    }
};
AccountService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMiscellaneousService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IEmailService)),
    __metadata("design:paramtypes", [Object, Object])
], AccountService);
exports.default = AccountService;
//# sourceMappingURL=AccountService.js.map