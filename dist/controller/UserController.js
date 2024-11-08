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
exports.UserController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config-ioc/types");
let UserController = class UserController {
    _userService;
    // Inject IUserService instead of UserController
    constructor(userService) {
        this._userService = userService;
    }
    get(req, res) {
        const userId = req.params.id;
        const user = this._userService.getUser(userId);
        res.send(user);
    }
    getUser(req, res) {
        const userId = req.params.id;
        const user = this._userService.getUser(userId);
        res.send(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, inversify_express_utils_1.controller)("/users"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
//# sourceMappingURL=UserController.js.map