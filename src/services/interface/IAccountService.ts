import LoginModel from "../../models/LoginModel";
import UserDto from "../../dtos/UserDto";
import { UserModel } from "../../database/models/UserModel";


export default interface IAccountService {
   login(model: LoginModel): Promise<{userId: string}>;
   register(model: UserModel): Promise<UserDto>;
}
