"use-strict";
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
exports.EmailController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
const Signature_1 = require("../helpers/Signature");
let EmailController = class EmailController {
    _emailService;
    constructor(emailService) {
        this._emailService = emailService;
    }
    generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }
    async sendOTPEmail(req, res) {
        const model = req.body;
        try {
            const result = this.generateOTP();
            model.message = result;
            model.subject = "Complete Your Verification with OTP:-";
            const signatureResponse = (0, Signature_1.otpSignature)(model);
            const emailData = {
                email: model.email,
                subject: model.subject,
                message: signatureResponse
            };
            return await this._emailService.sendEmail(emailData);
        }
        catch (error) {
            res.status(500).send({
                message: "Failed to send OTP email.",
                error: error
            });
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/otp"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendOTPEmail", null);
exports.EmailController = EmailController = __decorate([
    (0, inversify_express_utils_1.controller)("/email"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IEmailService)),
    __metadata("design:paramtypes", [Object])
], EmailController);
//# sourceMappingURL=EmailController.js.map