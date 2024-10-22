const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const path = require('path');
const fs = require('fs');
const caCertPath = path.resolve(__dirname, 'ca', 'ca.pem');
console.log("process.env.DB_NAME", process.env.DB_NAME)
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  local: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    migrationStoragePath: path.resolve(__dirname, './migrations'),
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(caCertPath).toString(),
        require: true,
        rejectUnauthorized: true,
      },
      connectTimeout: 10000,
    },
  },
};