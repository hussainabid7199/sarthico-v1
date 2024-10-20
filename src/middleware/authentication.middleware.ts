import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import config from '../jwt-config';
import UnauthorizedError from '../exceptions/unauthorized-error';

// The CustomRequest interface enables us to provide JWTs to our controllers.
export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT from the request header.
  const token = <string>req.headers['authorization'];
  let jwtPayload;

  // Validate the token and retrieve its data.
  try {
    // Verify the payload fields.
    jwtPayload = <any>verify(token?.split(' ')[1], config.jwt.secret!, {
      complete: true,
      audience: config.jwt.audience,
      issuer: config.jwt.issuer,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
    // Add the payload to the request so controllers may access it.
    (req as CustomRequest).token = jwtPayload;
  } catch (error) {
    console.log("error", error);
    throw new UnauthorizedError('Missing or invalid token');
  }

  // Pass programmatic flow to the next middleware/controller.
  next();
};
