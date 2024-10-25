import LoginModel from "../../models/LoginModel";
import UserDto from "../../dtos/UserDto";
import { UserModel } from "../../database/models/UserModel";


export default interface IMiscellaneousService {
   generateOTP(): string;
}
