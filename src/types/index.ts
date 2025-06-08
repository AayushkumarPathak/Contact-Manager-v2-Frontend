export interface userFormSignInData{
    fullName:string;
    username:string;
    email:string;
    password:string;
    phoneNumber:string;
    address:string;
    about:string;
}

export interface userFormLoginData{
    username:string,
    password:string;
}

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  link:string
  favorite: boolean;
};