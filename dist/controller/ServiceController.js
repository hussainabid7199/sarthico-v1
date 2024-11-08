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
exports.ServiceController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const role_enum_1 = require("../enums/role.enum");
const ServiceSchema_1 = __importDefault(require("../schema/ServiceSchema"));
let ServiceController = class ServiceController {
    _serviceService;
    constructor(serviceService) {
        this._serviceService = serviceService;
    }
    async get(req, res) {
        try {
            const response = await this._serviceService.get();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve services." });
        }
    }
    async getById(req, res) {
        try {
            const serviceResponse = await this._serviceService.getById(parseInt(req.params.id));
            return res.status(200).json(serviceResponse);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve service." });
        }
    }
    async create(req, res) {
        try {
            const serviceResponse = await this._serviceService.create(req.body);
            return res.status(201).json(serviceResponse);
        }
        catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ success: false, message: "Failed to create service." });
        }
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "get", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getById", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", authentication_middleware_1.authentication, (0, authorization_middleware_1.authorization)([role_enum_1.Roles.Administrator, role_enum_1.Roles.Manager]), (0, validation_middleware_1.default)(ServiceSchema_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "create", null);
exports.ServiceController = ServiceController = __decorate([
    (0, inversify_express_utils_1.controller)("/service"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IServiceService)),
    __metadata("design:paramtypes", [Object])
], ServiceController);
//# sourceMappingURL=ServiceController.js.map