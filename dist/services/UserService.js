"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const UserModel_1 = require("../database/models/UserModel");
let UserService = class UserService {
    async get() {
        const response = await UserModel_1.UserModel.findAll({
            attributes: [
                "uniqueId",
                "firstName",
                "lastName",
                "email",
                "phone",
            ],
            raw: true
        });
        if (response && response.length > 0 && response) {
            return {
                success: true,
                data: response,
            };
        }
        else {
            return {
                success: false,
                data: [],
            };
        }
    }
    async getById(id) {
        const response = await UserModel_1.UserModel.findOne({
            where: {
                id,
                isActive: true,
                isDeleted: false
            },
            attributes: [
                "userId",
                "uniqueId",
                "firstName",
                "lastName",
                "email",
                "phone",
            ],
            raw: true
        });
        if (response) {
            return {
                success: true,
                data: response,
            };
        }
        else {
            return {
                success: false,
                message: "User don't exist!"
            };
        }
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)()
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map