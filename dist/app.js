"use-strict";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const clientid_middleware_1 = __importDefault(require("./middleware/clientid.middleware"));
const inversify_express_utils_1 = require("inversify-express-utils");
const ioc_1 = require("./config-ioc/ioc");
dotenv_1.default.config();
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV?.trim()}` });
// Sequelize connection path
const connection_1 = __importDefault(require("./database/connection"));
// Controller imports
require("./controller/controllers");
const publicPath = path_1.default.join(__dirname, "../public");
const server = new inversify_express_utils_1.InversifyExpressServer(ioc_1.container);
server.setConfig((app) => {
    const clientIDMiddleware = new clientid_middleware_1.default();
    app.use(express_1.default.static(publicPath));
    app.use((0, express_session_1.default)({
        secret: process.env.JWT_SECRET || "",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Use 'true' if using HTTPS
    }));
    app.use((0, cors_1.default)({
        origin: "*", // Allow any origin
        methods: ["GET", "PUT", "POST", "DELETE", "PATCH"], // Allow specific HTTP methods
        allowedHeaders: "*", // Allow any headers
        credentials: true, // Allow credentials if necessary
        optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(clientIDMiddleware.verify);
});
server.setErrorConfig((app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send({ error: err.message, success: false });
    });
});
const app = server.build();
const port = process.env.PORT;
app.listen(port || 3002, async () => {
    try {
        await connection_1.default.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    console.log("Server is running on port " + port);
});
//# sourceMappingURL=app.js.map