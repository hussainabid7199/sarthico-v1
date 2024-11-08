"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
function errorHandler(err, req, res, next) {
    if (!(err instanceof custom_error_1.default)) {
        const response = {
            success: false,
            message: 'Server error, please try again later',
        };
        return res.status(500).json(response);
    }
    else {
        const customError = err;
        let response = {
            message: customError.message,
        };
        // Check if there is more info to return.
        if (customError.additionalInfo) {
            response.additionalInfo = customError.additionalInfo;
        }
        const jsonResponse = {
            success: false,
            message: response.message,
            errors: response.additionalInfo && [response.additionalInfo] || [],
        };
        return res.status(customError.status).json(jsonResponse);
    }
}
exports.default = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map