import { injectable } from "inversify";
import IAccountService from "./interface/IAccountService";
import LoginDto from "../dtos/LoginDto";
import UserDto from "../dtos/UserDto";
import LoginModel from "../models/LoginModel";
import { RoleModel } from "../database/models/RoleModel";
import { Op } from "sequelize";
import BcryptUtils from "../utils/bcrypt.utils";
import { UserModel } from "../database/models/UserModel";
import RoleDto from "../dtos/RoleDto";
import * as jwt from "jsonwebtoken";
import config from "../config";

@injectable()
export class AccountService implements IAccountService {
  async login(model: LoginModel): Promise<UserDto> {
    if (!model.username && !model.password) {
      throw new Error("Login credentials required");
    }

    const _user = await UserModel.findOne({
      include: RoleModel,
      where: {
        email: model.username,
        isActive: true,
        [Op.or]: [{ isDelete: null }, { isDelete: false }],
      },
    });

    if (!_user) {
      throw new Error("Invalid username or password");
    }

    const isPasswordValid = await BcryptUtils.comparePassword(
      model.password,
      _user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    const userDetails: UserDto = {
      userId: _user.userId,
      firstName: _user.firstName,
      lastName: _user.lastName,
      email: _user.email,
      isActive: _user.isActive,
      phone: _user.phone,
      createdOn: _user.createdOn,
      token: "",
      roles: _user.roles.map((e) => {
        const role: RoleDto = {
          id: e.roleId,
          name: e.roleName,
        };

        return role;
      }),
    };

    const secret = config.jwt.secret;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const token = jwt.sign(
      {
        userId: _user.userId,
        username: `${_user.firstName + " " + _user.lastName}`,
        user: userDetails,
      },
      secret,
      {
        expiresIn: "1y",
        algorithm: "HS256",
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        notBefore: "0",
      }
    );

    const loginResponse: UserDto = {
        userId: _user.userId,
        firstName: _user.firstName,
        lastName: _user.lastName,
        email: _user.email,
        isActive: _user.isActive,
        phone: _user.phone,
        createdOn: _user.createdOn,
        token: token || "",
        roles: _user.roles.map((e) => {
          const role: RoleDto = {
            id: e.roleId,
            name: e.roleName,
          };

          return role;
        }),
    };
    
    return loginResponse;
  }
  
  register(model: UserModel): Promise<UserDto> {
    throw new Error("Method not implemented.");
  }
}
