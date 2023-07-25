export interface ISignup {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}

export interface IUpdatePassword {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
