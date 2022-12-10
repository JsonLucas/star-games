import axiosInstance from '..';
import { Login, SignUp } from '../../types/users';

export const loginRequest = async (body: Login) => {
    const { data } = await axiosInstance.post('/sign-in', body);
	return data;
}

export const signUpRequest = async (body: SignUp) => {
    return await axiosInstance.post('/sign-up', body);
}

export const getUserInformation = async () => {
	const { data } = await axiosInstance.get('/user-info');
	return data;
}

export const getCityByCep = async (cep: string) => {
    return await axiosInstance.get(`https://viacep.com.br/ws/${cep}/json/`);
}