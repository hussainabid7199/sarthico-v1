"use-strict"
import 'reflect-metadata';
import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import ClientIdMiddleware from "./middleware/clientid.middleware";
import errorHandler from "./middleware/error-handler.middleware";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config-ioc/ioc";

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV?.trim()}` });

// Sequelize connection path
import sequelize from "./database/connection";
// Controller imports
import "./controller/controllers";

const publicPath = path.join(__dirname, "../public");
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  const clientIDMiddleware = new ClientIdMiddleware();
  app.use(express.static(publicPath));
  app.use(
    session({
      secret: process.env.JWT_SECRET || "",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Use 'true' if using HTTPS
    })
  );

  app.use(
    cors({
      origin: "*", // Allow any origin
      methods: ["GET", "PUT", "POST", "DELETE", "PATCH"], // Allow specific HTTP methods
      allowedHeaders: "*", // Allow any headers
      credentials: true, // Allow credentials if necessary
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(clientIDMiddleware.verify);
});

server.setErrorConfig((app) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    res.status(500).send({error: err.message, success: false}); 
  });
});

const app = server.build();
const port = process.env.PORT;

app.listen(port || 3002, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("server is running on port " + port);
});
