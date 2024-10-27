
export default interface IMiscellaneousService {
   generateOTP(): string;
   checkOTPExpirationDuration(createdOn: string, validDuration: number): boolean;
}
