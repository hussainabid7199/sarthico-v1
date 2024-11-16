"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_config_1 = __importDefault(require("../jwt-config"));
const unauthorized_error_1 = __importDefault(require("../exceptions/unauthorized-error"));
const authentication = (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;
    // Validate the token and retrieve its data.
    try {
        // Verify the payload fields.
        jwtPayload = (0, jsonwebtoken_1.verify)(token?.split(' ')[1], jwt_config_1.default.jwt.secret, {
            complete: true,
            audience: jwt_config_1.default.jwt.audience,
            issuer: jwt_config_1.default.jwt.issuer,
            algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false,
        });
        // Add the payload to the request so controllers may access it.
        req.token = jwtPayload;
    }
    catch (error) {
        console.log("error", error);
        throw new unauthorized_error_1.default('Missing or invalid token');
    }
    // Pass programmatic flow to the next middleware/controller.
    next();
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.middleware.js.map