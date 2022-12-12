import axiosInstance from '..';
import { Login, SignUp, UserData } from '../../types/users';

interface Auth{
	accessToken: string,
	refreshToken: string
}

export const loginRequest = async (body: Login) => {
    const { data } = await axiosInstance.post<Auth>('/sign-in', body);
	return data;
}

export const signUpRequest = async (body: SignUp) => {
    const { data } = await axiosInstance.post<Auth>('/sign-up', body);
	return data;
}

export const getUserInformation = async () => {
	const { data } = await axiosInstance.get<UserData>('/user-info');
	return data;
}

export const getCityByCep = async (cep: string) => {
    return await axiosInstance.get(`https://viacep.com.br/ws/${cep}/json/`);
}