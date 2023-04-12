export interface UserRegister {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    address: string,
    confirm_password: string
}

export interface UserLogin{
    email: string,
    password: string,
}