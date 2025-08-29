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
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  picture: string;
  description: string;
  favorite: boolean;
  websiteLink: string;
  linkedInLink: string;
  createdAt: string;
  links: {
    id: number;
    title: string;
    link: string;
  }[];
};

export type PaginatedContactResponse = {
  contacts: Contact[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
};



// types/User.ts
export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  address: string;
  about: string;
  createdAt: string;
  enabled: boolean;
  provider: string;
  roles: Role[];
}

// src/types/contact.ts
export interface ContactLink {
  link: string;
  title: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  description: string;
  favorite: boolean;
  websiteLink: string;
  linkedInLink: string;
  cloudinaryPublicId?: string;
  links: ContactLink[];
}

