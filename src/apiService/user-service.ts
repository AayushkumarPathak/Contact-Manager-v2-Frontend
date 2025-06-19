import type { userFormLoginData, userFormSignInData, User } from '@/types';
import { myAxios } from './Api-Constants';

// BASE_URL is defined in APP_Constants.ts
// Ex - http://localhost:8080/api/v2/**

export const signupUser = async(user:userFormSignInData) => {
    return myAxios
    .post('/auth/register',user)
    .then((response)=>response.data);
}

export const loginUser = async(loginUser:userFormLoginData) => {
    return myAxios
    .post('/auth/login',loginUser)
    .then((response)=>response.data);
}

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  const response = await myAxios.put(`/users/${userId}`, userData);
  return response.data;
};



