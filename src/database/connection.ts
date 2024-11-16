"use-strict"
import { Sequelize } from "sequelize-typescript";
const fs = require("fs");
import * as path from "path";
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const caCertPath = path.resolve(__dirname, "ca", "ca.pem");
console.log("process.env.DB_NAME", process.env.DB_NAME)
const dbConfigSetup = () => {
  const devType: string = process.env.NODE_ENV?.trim() || "local";
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
  } else if (devType && devType === "development") {
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
  } else if (devType && devType === "production") {
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
  } else {
    throw new Error("Invalid environment NODE_ENV");
  }
};

const devConnection: any = dbConfigSetup();
const sequelize = new Sequelize(devConnection);
export default sequelize;



