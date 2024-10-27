import LoginModel from "../../models/LoginDataModel";
import UserDto from "../../dtos/UserDto";
import { UserModel } from "../../database/models/UserModel";


export default interface IAccountService {
   login(model: LoginModel): Promise<{uniqueId: string}>;
   register(model: UserModel): Promise<UserDto>;
}
