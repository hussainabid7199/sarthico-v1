"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const connection_1 = __importDefault(require("../database/connection"));
const UserServiceModel_1 = require("../database/models/UserServiceModel");
const ServiceModel_1 = require("../database/models/ServiceModel");
let UserServiceMappingService = class UserServiceMappingService {
    async getAll() {
        const response = await UserServiceModel_1.UserServiceModel.findAll({
            where: {
                isActive: true,
                isDeleted: false,
            },
            attributes: ["uniqueId", "serviceId"],
            // include: [
            //   {
            //     model: ServiceModel,
            //     attributes: ["serviceName"],
            //   },
            // ],
        });
        if (response) {
            return {
                success: true,
                data: response.map((item) => ({
                    uniqueId: item.uniqueId,
                    serviceName: item.serviceId.toString(),
                })),
            };
        }
        else {
            return {
                success: false,
                message: "Failed to retrieve user services.",
            };
        }
    }
    update(id) {
        throw new Error("Method not implemented.");
    }
    delete(uniqueId) {
        throw new Error("Method not implemented.");
    }
    async create(model) {
        const t = await connection_1.default.transaction();
        try {
            const existingUserService = await UserServiceModel_1.UserServiceModel.findOne({
                where: {
                    userId: model.userId,
                    serviceId: model.serviceId,
                    isActive: true,
                    isDeleted: false,
                },
            });
            if (existingUserService) {
                return {
                    success: false,
                    message: "Services already exist.",
                };
            }
            const createdMapping = await UserServiceModel_1.UserServiceModel.create(model, {
                transaction: t,
            });
            const serviceResponse = await ServiceModel_1.ServiceModel.findOne({
                where: {
                    serviceId: model.serviceId,
                },
                attributes: ["serviceName"],
                order: [["serviceId", "ASC"]],
                raw: true
            });
            if (createdMapping && serviceResponse) {
                await t.commit();
                return {
                    success: true,
                    data: {
                        uniqueId: createdMapping.uniqueId,
                        serviceName: serviceResponse.serviceName,
                    },
                };
            }
            else {
                await t.rollback();
                return {
                    success: false,
                    message: "No services added",
                };
            }
        }
        catch (error) {
            console.log("error", error);
            await t.rollback();
            return {
                success: false,
                message: "No services added",
            };
        }
    }
};
UserServiceMappingService = __decorate([
    (0, inversify_1.injectable)()
], UserServiceMappingService);
exports.default = UserServiceMappingService;
//# sourceMappingURL=UserServiceMappingService.js.map