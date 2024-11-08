"use-strict";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const fs = require("fs");
const path = __importStar(require("path"));
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const caCertPath = path.resolve(__dirname, "ca", "ca.pem");
console.log("process.env.DB_NAME", process.env.DB_NAME);
const dbConfigSetup = () => {
    const devType = process.env.NODE_ENV?.trim() || "local";
    if (devType && devType === "local") {
        return {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            models: [__dirname + "/models"],
            dialect: "mysql",
            migrationStorageTableName: "migrations",
            migrationStoragePath: path.resolve(__dirname, "./migrations"),
        };
    }
    else if (devType && devType === "development") {
        return {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            models: [__dirname + "/models"],
            dialect: "mysql",
            migrationStorageTableName: "migrations",
            migrationStoragePath: path.resolve(__dirname, "./migrations"),
        };
    }
    else if (devType && devType === "production") {
        return {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            models: [__dirname + "/models"],
            dialect: "mysql",
            migrationStorageTableName: "migrations",
            migrationStoragePath: path.resolve(__dirname, "./migrations"),
            dialectModule: require('mysql2'),
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(caCertPath),
                    require: true,
                    rejectUnauthorized: true,
                },
                connectTimeout: 60000,
            },
            logging: false,
        };
    }
    else {
        throw new Error("Invalid environment NODE_ENV");
    }
};
const devConnection = dbConfigSetup();
const sequelize = new sequelize_typescript_1.Sequelize(devConnection);
exports.default = sequelize;
//# sourceMappingURL=connection.js.map