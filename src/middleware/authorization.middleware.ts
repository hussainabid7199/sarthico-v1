import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from './authentication.middleware';
import { Roles } from '../enums/role.enum';
import NotFoundError from '../exceptions/not-found-error';
import ForbiddenError from '../exceptions/forbidden-error';
import { RoleModel } from '../database/models/RoleModel';

export const authorization = (roles: Array<Roles>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Find the user with the requested ID.
      const roleName = (req as CustomRequest).token.payload.roleName || '';
      const isActive = (req as CustomRequest).token.payload.user.isActive || false;
      
      // Ensure we found a user.
      if (!isActive) {
        throw new NotFoundError('User not found');
      }
      
      const hasMatchingRole = roles.includes(roleName as Roles);

      if (hasMatchingRole) {
        next();
      } else {
        throw new ForbiddenError('Not enough permissions');
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ForbiddenError) {
        res.status(error.status).json({ message: error.message });
      } else {
        // Handle other unexpected errors
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
};

