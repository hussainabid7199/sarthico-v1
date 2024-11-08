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
const ServiceModel_1 = require("../database/models/ServiceModel");
const ServiceSchema_1 = __importDefault(require("../schema/ServiceSchema"));
const connection_1 = __importDefault(require("../database/connection"));
let ServiceService = class ServiceService {
    async get() {
        const serviceResponse = await ServiceModel_1.ServiceModel.findAll({
            where: {
                isActive: true,
                isDeleted: false,
            },
            attributes: ["uniqueId", "serviceId", "serviceName"],
            order: [["serviceId", "ASC"]],
            raw: true,
        });
        if (serviceResponse && serviceResponse.length > 0) {
            return {
                success: true,
                data: serviceResponse,
            };
        }
        else {
            return {
                success: false,
                data: [],
                message: "No services found",
            };
        }
    }
    async getById(id) {
        const serviceResponse = await ServiceModel_1.ServiceModel.findOne({
            where: {
                id,
                isActive: true,
                isDeleted: false,
            },
            attributes: ["uniqueId", "serviceId", "serviceName"],
            order: [["serviceId", "ASC"]],
            raw: true,
        });
        if (serviceResponse) {
            return {
                success: true,
                data: serviceResponse,
            };
        }
        else {
            return {
                success: false,
                message: "No services found",
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
            const validatedData = await ServiceSchema_1.default.validate(model, {
                abortEarly: false,
            });
            if (!validatedData) {
                throw new Error("Validation failed");
            }
            const createdService = await ServiceModel_1.ServiceModel.create(model, {
                transaction: t,
                attributes: ["uniqueId", "serviceId", "serviceName"],
                order: [["serviceId", "ASC"]],
                raw: true,
            });
            const serviceResponse = {
                uniqueId: createdService.dataValues.uniqueId,
                serviceId: createdService.dataValues.serviceId,
                serviceName: createdService.dataValues.serviceName,
            };
            if (serviceResponse) {
                await t.commit();
                return {
                    success: true,
                    data: serviceResponse,
                };
            }
            else {
                await t.rollback();
                return {
                    success: false,
                    message: "No services ",
                };
            }
        }
        catch (error) {
            await t.rollback();
            return {
                success: false,
                message: "No services found",
            };
        }
    }
    searchServices(searchTerm) {
        throw new Error("Method not implemented.");
    }
};
ServiceService = __decorate([
    (0, inversify_1.injectable)()
], ServiceService);
exports.default = ServiceService;
//# sourceMappingURL=ServiceService.js.map