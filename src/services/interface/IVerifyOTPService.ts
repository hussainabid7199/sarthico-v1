import UserDto from "../../dtos/UserDto";

export default interface IVerifyOTPService {
  verifyLoginOTP(uniqueId: string, OTP: number): Promise<UserDto | undefined>;
}