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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
let OTPController = class OTPController {
    _verifyOTPService;
    constructor(_verifyOTPService) {
        this._verifyOTPService = _verifyOTPService;
    }
    async loginOTP(req, res) {
        const uniqueId = req.query.uniqueId;
        const otp = parseInt(req.body.otp);
        try {
            const response = await this._verifyOTPService.verifyLoginOTP(uniqueId, otp);
            res.status(200).json({
                message: "OTP verified successfully",
                response,
            });
        }
        catch (error) {
            console.error("Error during OTP verification:", error.message);
            if (error.message === "User not found." || error.message === "Invalid OTP") {
                res.status(400).json({ message: error.message });
            }
            else if (error.message === "OTP expired") {
                res.status(410).json({ message: "OTP expired" });
            }
            else {
                res.status(500).json({
                    message: "OTP verification unsuccessful",
                    error: error.message || "An unknown error occurred",
                });
            }
        }
    }
};
exports.OTPController = OTPController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/otp"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OTPController.prototype, "loginOTP", null);
exports.OTPController = OTPController = __decorate([
    (0, inversify_express_utils_1.controller)("/verify"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IVerifyOTPService)),
    __metadata("design:paramtypes", [Object])
], OTPController);
//# sourceMappingURL=VerifyOTPController.js.map