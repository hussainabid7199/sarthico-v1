"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_error_1 = __importDefault(require("../exceptions/unauthorized-error"));
class ClientIdMiddleware {
    verify(req, res, next) {
        const clientId = req.headers['clientid'];
        const _clientId = process.env.CLIENT_ID;
        if (!clientId) {
            throw new unauthorized_error_1.default('ClientId header is missing');
        }
        if (clientId !== _clientId) {
            throw new unauthorized_error_1.default('Invalid Client Id');
        }
        req.clientId = clientId;
        // Call next to pass control to the next middleware or route handler
        next();
    }
}
exports.default = ClientIdMiddleware;
//# sourceMappingURL=clientid.middleware.js.map