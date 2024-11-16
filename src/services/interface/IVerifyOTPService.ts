import UserDto from "../../dtos/UserDto";
import Response from "../../dtos/Response";

export default interface IVerifyOTPService {
  verifyLoginOTP(uniqueId: string, OTP: number): Promise<Response<UserDto>>;
}