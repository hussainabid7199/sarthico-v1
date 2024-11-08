"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const UserModel_1 = require("../database/models/UserModel");
const UserOTPModel_1 = __importDefault(require("../database/models/UserOTPModel"));
const jwt = __importStar(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../jwt-config"));
const types_1 = require("../config-ioc/types");
const RoleModel_1 = require("../database/models/RoleModel");
const jwtSecret = jwt_config_1.default.jwt.secret;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
let VerifyOTPService = class VerifyOTPService {
    _miscellaneousService;
    constructor(miscellaneousService) {
        this._miscellaneousService = miscellaneousService;
    }
    async verifyLoginOTP(uniqueId, OTP) {
        if (!uniqueId || !OTP) {
            throw new Error("Invalid parameters provided.");
        }
        const userResponse = await UserModel_1.UserModel.findOne({
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
        const roleResponse = await RoleModel_1.RoleModel.findOne({
            where: {
                roleId: userResponse?.roleId
            },
            raw: true,
        });
        if (!roleResponse) {
            throw new Error("Invalid role!");
        }
        const getOTPDetails = await UserOTPModel_1.default.findOne({
            where: { uniqueId },
            raw: true,
        });
        if (!getOTPDetails || getOTPDetails.otp !== OTP.toString()) {
            throw new Error("Invalid OTP");
        }
        const isTenMinutesPassed = this._miscellaneousService.checkOTPExpirationDuration(getOTPDetails.createdOn.toString(), 10);
        if (isTenMinutesPassed) {
            throw new Error("OTP expired");
        }
        const jwtSecret = jwt_config_1.default.jwt.secret;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const { userId, password, roleId, ...userWithoutPassword } = userResponse;
        const token = jwt.sign({
            userId: userResponse.userId,
            email: userResponse.email,
            roleUniqueId: roleResponse.uniqueId,
            roleName: roleResponse.roleName,
            user: userWithoutPassword,
        }, jwtSecret, {
            expiresIn: "1h",
            algorithm: "HS256",
            audience: jwt_config_1.default.jwt.audience,
            issuer: jwt_config_1.default.jwt.issuer,
            notBefore: "0",
        });
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
};
VerifyOTPService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMiscellaneousService)),
    __metadata("design:paramtypes", [Object])
], VerifyOTPService);
exports.default = VerifyOTPService;
//# sourceMappingURL=VerifyOTPService.js.map