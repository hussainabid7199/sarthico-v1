"use-strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    message;
    status;
    additionalInfo;
    constructor(message, status = 500, additionalInfo = undefined) {
        super(message);
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }
}
exports.default = CustomError;
//# sourceMappingURL=custom-error.js.map