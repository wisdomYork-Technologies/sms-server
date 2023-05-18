export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  schoolName: string;
  schoolLocation: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
