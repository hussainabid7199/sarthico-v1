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
exports.ServiceModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let ServiceModel = class ServiceModel extends sequelize_typescript_1.Model {
    serviceId;
    uniqueId;
    serviceName;
    createdOn;
    updatedOn;
    isActive;
    isDeleted;
};
exports.ServiceModel = ServiceModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ServiceModel.prototype, "serviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", String)
], ServiceModel.prototype, "uniqueId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ServiceModel.prototype, "serviceName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    }),
    __metadata("design:type", Date)
], ServiceModel.prototype, "createdOn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    }),
    __metadata("design:type", Date)
], ServiceModel.prototype, "updatedOn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], ServiceModel.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], ServiceModel.prototype, "isDeleted", void 0);
exports.ServiceModel = ServiceModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "service",
    })
], ServiceModel);
//# sourceMappingURL=ServiceModel.js.map