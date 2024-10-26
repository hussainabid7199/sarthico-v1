import LoginModel from "../../models/LoginDataModel";
import UserDto from "../../dtos/UserDto";
import { UserModel } from "../../database/models/UserModel";


export default interface IMiscellaneousService {
   generateOTP(): string;
}
