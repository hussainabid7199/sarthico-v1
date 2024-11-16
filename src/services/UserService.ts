import { injectable } from "inversify";
import IUserService from "./interface/IUserService";
import UserDto from "../dtos/UserDto";
import Response from "../dtos/Response";
import { UserModel } from "../database/models/UserModel";

@injectable()
export default class UserService implements IUserService {
  async get(): Promise<Response<UserDto[]>> {
    const response: UserDto[] = await UserModel.findAll({
      attributes: [
        "uniqueId",
        "firstName",
        "lastName",
        "email",
        "phone",
      ],
      raw: true
    });
    if (response && response.length > 0 && response) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  }

 async getById(id: string): Promise<Response<UserDto>> {
    const response = await UserModel.findOne({
      where:{
        id,
        isActive: true,
        isDeleted: false
      },
      attributes: [
        "userId",
        "uniqueId",
        "firstName",
        "lastName",
        "email",
        "phone",
      ],
      raw: true
    });
    if (response) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        message: "User don't exist!"
      };
    }
  }
}
