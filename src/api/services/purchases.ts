import axiosInstance from "..";
import { Address, Cards } from "../../types/users";

export const purchase = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchase', body, headers);
}

export const getHistory = async (headers: any) => {
    const { data } = await axiosInstance.get('/purchases', headers);
	return data;
}

export const addPayMethodData = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchases/payment', body, headers);
}

export const getPayMethod = async (headers: any) => {
    const { data } = await axiosInstance.get<Array<Cards>>('/purchases/payment', headers);
	return data;
}

export const getAddresses = async (headers: any) => {
    const { data } = await axiosInstance.get<Array<Address>>('/purchases/address', headers);
	return data;
}

export const addAddressData = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchases/address', body, headers);
}