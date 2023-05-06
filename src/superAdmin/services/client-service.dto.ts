export interface UserRegister {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface UserLogin{
    email: string,
    password: string,
}