"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map