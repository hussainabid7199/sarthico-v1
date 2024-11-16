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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const jwt = __importStar(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../jwt-config"));
let MiscellaneousService = class MiscellaneousService {
    generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }
    checkOTPExpirationDuration(createdOn, durationInMinutes) {
        !durationInMinutes ? durationInMinutes == 5 : durationInMinutes;
        const createdDate = new Date(createdOn);
        const durationInMs = durationInMinutes * 60 * 1000;
        return new Date() >= new Date(createdDate.getTime() + durationInMs);
    }
    async generateToken(model, roleResponse) {
        if (!model && !roleResponse) {
            throw new Error("Invalid user!");
        }
        const jwtSecret = jwt_config_1.default.jwt.secret;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const { userId, password, roleId, ...userWithoutPassword } = model;
        const token = await jwt.sign({
            userId: model.userId,
            email: model.email,
            roleUniqueId: roleResponse.roleId,
            roleName: roleResponse.roleName,
            user: userWithoutPassword,
        }, jwtSecret, {
            expiresIn: "1h",
            algorithm: "HS256",
            audience: jwt_config_1.default.jwt.audience,
            issuer: jwt_config_1.default.jwt.issuer,
            notBefore: "0",
        });
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
};
MiscellaneousService = __decorate([
    (0, inversify_1.injectable)()
], MiscellaneousService);
exports.default = MiscellaneousService;
//# sourceMappingURL=MiscellaneousService.js.map