"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
exports.default = asyncHandler;
//# sourceMappingURL=async-handler.middleware.js.map