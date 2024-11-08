import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';
import CustomResponse from '../dtos/Response';
import PlainDto from '../dtos/PlainDto';
import CustomError from '../exceptions/custom-error';

const validateSchema = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
      next();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        // const validationErrors = error.inner.map((err: any) => ({
        //   field: err.path,
        //   message: err.message,
        // }));

        const validationErrors = error.inner.map((err: any) => err.message);

        const response: CustomResponse<PlainDto> = {
          success: false,
          errors: validationErrors,
        };

        return res.status(400).json(response);
      }

      throw new CustomError('internal server error occured while validating the schema', 500);
    }
  };
};

export default validateSchema;

export const validateSchemaByBody = async (req: Request, schema: Schema) => {
  try {
    await schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
    const response: CustomResponse<PlainDto> = {
      success: true,
    };

    return response;
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const validationErrors = error.inner.map((err: any) => err.message);

      const response: CustomResponse<PlainDto> = {
        success: false,
        errors: validationErrors,
      };

      return response;
    }

    const response: CustomResponse<PlainDto> = {
      success: false,
      errors: ['internal server error occured while validating the schema'],
    };

    return response;
  }
};
