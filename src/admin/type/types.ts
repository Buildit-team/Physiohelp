

export interface SignUpData {
    email: string;
    name: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface VerificationData {
    secret: string;
    email: string;
}

export interface  IErrorResponse {
    message: string;
    response: {
        data: {
            error: {
                message: string;
            };
            message: string;
        }
    }
}