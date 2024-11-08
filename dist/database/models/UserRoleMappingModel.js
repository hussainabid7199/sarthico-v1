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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleMappingModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const UserModel_1 = require("./UserModel");
const RoleModel_1 = require("./RoleModel");
let UserRoleMappingModel = class UserRoleMappingModel extends sequelize_typescript_1.Model {
    userId;
    roleId;
};
exports.UserRoleMappingModel = UserRoleMappingModel;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UserModel_1.UserModel),
    (0, sequelize_typescript_1.Column)({
        field: "userId",
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], UserRoleMappingModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => RoleModel_1.RoleModel),
    (0, sequelize_typescript_1.Column)({
        field: "roleId",
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], UserRoleMappingModel.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => UserModel_1.UserModel),
    __metadata("design:type", UserModel_1.UserModel)
], UserRoleMappingModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => RoleModel_1.RoleModel),
    __metadata("design:type", RoleModel_1.RoleModel)
], UserRoleMappingModel.prototype, "role", void 0);
exports.UserRoleMappingModel = UserRoleMappingModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "usersRolesMapping",
    })
], UserRoleMappingModel);
//# sourceMappingURL=UserRoleMappingModel.js.map