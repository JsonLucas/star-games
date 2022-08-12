import axiosInstance from '..';
import { Login, SignUp } from '../../types/users';

export const loginRequest = async (body: Login) => {
    return await axiosInstance.post('/sign-in', body);
}

export const signUpRequest = async (body: SignUp) => {
    return await axiosInstance.post('/sign-up', body);
}

export const verificateToken = async (token: string) => {
    return await axiosInstance.post('/auth-user', { token });
} 

export const getCityByCep = async (cep: string) => {
    return await axiosInstance.get(`https://viacep.com.br/ws/${cep}/json/`);
}