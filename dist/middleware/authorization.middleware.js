"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const not_found_error_1 = __importDefault(require("../exceptions/not-found-error"));
const forbidden_error_1 = __importDefault(require("../exceptions/forbidden-error"));
const authorization = (roles) => {
    return async (req, res, next) => {
        try {
            // Find the user with the requested ID.
            const roleName = req.token.payload.roleName || '';
            const isActive = req.token.payload.user.isActive || false;
            console.log("roleName", roleName);
            // const rolesResponse = await RoleModel.findOne({
            //   where: {
            //     uniqueId: uniqueId,
            //   },
            //   raw: true,
            // });
            // Ensure we found a user.
            if (!isActive) {
                throw new not_found_error_1.default('User not found');
            }
            const hasMatchingRole = roles.includes(roleName);
            if (hasMatchingRole) {
                next();
            }
            else {
                throw new forbidden_error_1.default('Not enough permissions');
            }
        }
        catch (error) {
            if (error instanceof not_found_error_1.default || error instanceof forbidden_error_1.default) {
                res.status(error.status).json({ message: error.message });
            }
            else {
                // Handle other unexpected errors
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
};
exports.authorization = authorization;
//# sourceMappingURL=authorization.middleware.js.map