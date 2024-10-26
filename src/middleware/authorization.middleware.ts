import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from './authentication.middleware';
import { Roles } from '../enums/role.enum';
import { Op } from 'sequelize';
import NotFoundError from '../exceptions/not-found-error';
import ForbiddenError from '../exceptions/forbidden-error';
import { UserModel } from '../database/models/UserModel';
import { RoleModel } from '../database/models/RoleModel';

export const authorization = (roles: Array<Roles>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Find the user with the requested ID.
      const userId = (req as CustomRequest).token.payload.userId || '';

      const user = await RoleModel.findOne({
        where: {
          userId: userId,
          isActive: true,
          [Op.or]: [{ isDelete: null }, { isDelete: false }],
        },
      });

      // Ensure we found a user.
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // const hasMatchingRole = user.roles.map((role) => role.toJSON()).some((role) => roles.includes(role.roleName));

      // if (hasMatchingRole) {
      //   next();
      // } else {
      //   throw new ForbiddenError('Not enough permissions');
      // }
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

