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
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let RoleModel = class RoleModel extends sequelize_typescript_1.Model {
    uniqueId;
    roleId;
    roleName;
    createdOn;
};
exports.RoleModel = RoleModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", String)
], RoleModel.prototype, "uniqueId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], RoleModel.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(36),
        allowNull: false,
        field: "roleName",
    }),
    __metadata("design:type", String)
], RoleModel.prototype, "roleName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "createdOn",
    }),
    __metadata("design:type", Date)
], RoleModel.prototype, "createdOn", void 0);
exports.RoleModel = RoleModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "roles",
    })
], RoleModel);
//# sourceMappingURL=RoleModel.js.map