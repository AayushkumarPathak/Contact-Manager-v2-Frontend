import axios from "axios";
import { getToken } from "@/auth";


export const BASE_URL:string ="http://localhost:8080/api/v2"

//for non-authenticated routes - login, signup
export const myAxios = axios.create({
    baseURL:BASE_URL,
})

//for all authenticated routes
export const privateAxios = axios.create({
    baseURL:BASE_URL,
})

//config for receiving jwt token
privateAxios.interceptors.request.use(
    config => {
        const token = getToken();
        if(token){
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)

);
