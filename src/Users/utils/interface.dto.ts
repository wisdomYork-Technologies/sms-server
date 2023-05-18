export interface AuthPayload{
    id: string,
    email: string,
    verified: boolean,
}
export interface LoginResponseData{
    message: string,
    signature: string,
    email: string,
    verified: boolean,
}

export interface EmailPayload {
  firstName: string;
  password: string;
  email: string;
}