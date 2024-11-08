export default interface EmailDataModel {
    userId?: string;
    email: string;
    cc?: string[];
    bcc?: string[];
    subject: string;
    message?: string;
}

export interface EmailOTPModel {
    email: string;
    subject?: string;
    message?: string;
}

export interface EmailOption{
    from: string;
    to: string;
    cc?: string[];
    bcc?: string[];
    subject?: string;
    html: string;
}