"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaByBody = void 0;
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
            next();
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                // const validationErrors = error.inner.map((err: any) => ({
                //   field: err.path,
                //   message: err.message,
                // }));
                const validationErrors = error.inner.map((err) => err.message);
                const response = {
                    success: false,
                    errors: validationErrors,
                };
                return res.status(400).json(response);
            }
            throw new custom_error_1.default('internal server error occured while validating the schema', 500);
        }
    };
};
exports.default = validateSchema;
const validateSchemaByBody = async (req, schema) => {
    try {
        await schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
        const response = {
            success: true,
        };
        return response;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = error.inner.map((err) => err.message);
            const response = {
                success: false,
                errors: validationErrors,
            };
            return response;
        }
        const response = {
            success: false,
            errors: ['internal server error occured while validating the schema'],
        };
        return response;
    }
};
exports.validateSchemaByBody = validateSchemaByBody;
//# sourceMappingURL=validation.middleware.js.map