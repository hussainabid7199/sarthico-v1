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
exports.UserServiceController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
let UserServiceController = class UserServiceController {
    _userMappingService;
    constructor(userMappingService) {
        this._userMappingService = userMappingService;
    }
    async get(req, res) {
        const userMappingServiceResponse = await this._userMappingService.getAll();
        if (userMappingServiceResponse &&
            userMappingServiceResponse?.data &&
            userMappingServiceResponse?.data?.length > 0) {
            return res.send(userMappingServiceResponse);
        }
        else {
            return res.status(404).send({ message: "No service found" });
        }
    }
};
exports.UserServiceController = UserServiceController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserServiceController.prototype, "get", null);
exports.UserServiceController = UserServiceController = __decorate([
    (0, inversify_express_utils_1.controller)("/user/service"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserServiceMappingService)),
    __metadata("design:paramtypes", [Object])
], UserServiceController);
//# sourceMappingURL=UserService.js.map