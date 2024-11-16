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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
const connection_1 = __importDefault(require("../database/connection"));
const UserModel_1 = require("../database/models/UserModel");
const bcrypt_utils_1 = __importDefault(require("../utils/bcrypt.utils"));
const { QueryTypes } = require("sequelize");
let AccountController = class AccountController {
    _accountService;
    constructor(accountService) {
        this._accountService = accountService;
    }
    async login(req, res) {
        const model = req.body;
        try {
            const response = await this._accountService.login(model);
            if (response && response.uniqueId) {
                const successResponse = {
                    success: true,
                    message: "Login successful!",
                    data: {
                        userId: response.uniqueId,
                        message: "Verify your account.",
                    },
                };
                res.status(200).send(successResponse);
            }
        }
        catch (error) {
            res.status(400).send({
                message: "Try again!",
                error: error,
            });
        }
    }
    async register(req, res) {
        const t = await connection_1.default.transaction();
        try {
            const model = req.body;
            const roleName = req.body.role;
            const confirmPassword = req.body.confirmPassword;
            const existingUser = await UserModel_1.UserModel.findOne({
                where: { email: model.email },
                attributes: ["userId"],
            });
            if (existingUser) {
                res.status(400).json({
                    success: false,
                    message: "Username already taken",
                });
                return;
            }
            if (model.password !== confirmPassword) {
                res.status(400).json({
                    success: false,
                    message: "Invalid username or password",
                });
                return;
            }
            const result = await connection_1.default.query("SELECT roleId FROM roles WHERE roleName = :roleName", {
                replacements: { roleName },
                type: QueryTypes.SELECT,
            });
            const roleId = result[0]?.roleId || 0;
            model.password = await bcrypt_utils_1.default.hashPassword(model.password);
            model.isActive = true;
            model.roleId = roleId;
            const userResponse = await UserModel_1.UserModel.create(model, {
                transaction: t,
                raw: true,
            });
            const { token, ...response } = userResponse.dataValues;
            await t.commit();
            res.status(201).json(response);
        }
        catch (error) {
            await t.rollback();
            res.status(400).json({
                success: false,
                message: "Some error occurred!",
                error: error,
            });
        }
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "login", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/register"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "register", null);
exports.AccountController = AccountController = __decorate([
    (0, inversify_express_utils_1.controller)("/account"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IAccountService)),
    __metadata("design:paramtypes", [Object])
], AccountController);
//# sourceMappingURL=AccountController.js.map