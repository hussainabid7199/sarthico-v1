export default interface EmailOTPDto {
  email: string;
  otp: number;
  status: number;
}

export interface EmailResponseDto {
  messageId: string;
  status: string;
}

export interface EmailSignature {
  name: string;
  position: string;
  contact: string;
  email: string;
  companyName: string;
  address: string;
  logo: string;
  message: string;
}
