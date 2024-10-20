import { Request, Response, NextFunction } from 'express';
import CustomError from '../exceptions/custom-error';
import CustomResponse from '../dtos/CustomResponse';
import PlainDto from '../dtos/PlainDto';
import IResponseError from '../interface/IResponseError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (!(err instanceof CustomError)) {
    const response: CustomResponse<PlainDto> = {
      success: false,
      message: 'Server error, please try again later',
    };

    return res.status(500).json(response);
  } else {
    const customError = err as CustomError;
    let response = {
      message: customError.message,
    } as IResponseError;

    // Check if there is more info to return.
    if (customError.additionalInfo) {
      response.additionalInfo = customError.additionalInfo;
    }

    const jsonResponse: CustomResponse<PlainDto> = {
      success: false,
      message: response.message,
      errors: response.additionalInfo && [response.additionalInfo] || [],
    };

    return res.status(customError.status).json(jsonResponse);
  }
}
