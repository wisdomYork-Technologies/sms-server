export interface AuthPayload{
    _id: string,
    email: string,
    verified: boolean,
}
export interface LoginResponseData{
    message: string,
    signature: string,
    email: string,
    verified: boolean,
}