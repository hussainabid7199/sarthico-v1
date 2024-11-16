
import { RoleModel } from "../../database/models/RoleModel";
import { UserModel } from "../../database/models/UserModel";
import Response from "../../dtos/Response";
import UserDto from "../../dtos/UserDto";
export default interface IMiscellaneousService {
   generateOTP(): string;
   checkOTPExpirationDuration(createdOn: string, validDuration: number): boolean;
   generateToken(model: UserModel, roleResponse: RoleModel): Promise<Response<UserDto>>;
}
