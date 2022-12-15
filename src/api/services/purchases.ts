import axiosInstance from "..";
import { IPurchases } from "../../types/purchases";
import { IAddress, ICards } from "../../types/users";

export const purchase = async (body: any) => {
    return await axiosInstance.post('/purchase', body);
}

export const getHistory = async () => {
    const { data } = await axiosInstance.get('/purchases');
	return data;
}

export const addPayMethodData = async (body: any, ) => {
    return await axiosInstance.post('/purchases/payment', body);
}

export const getPayMethod = async () => {
    const { data } = await axiosInstance.get<Array<ICards>>('/purchases/payment');
	return data;
}

export const getAddresses = async () => {
    const { data } = await axiosInstance.get<Array<IAddress>>('/purchases/address');
	return data;
}

export const addAddressData = async (body: any) => {
    return await axiosInstance.post('/purchases/address', body);
}