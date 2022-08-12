import axiosInstance from "..";

export const purchase = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchase', body, { headers });
}

export const getHistory = async (headers: any) => {
    return await axiosInstance.get('/purchases/history', headers);
}

export const addPayMethodData = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchases/payment', body, headers);
}

export const addAddressData = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchases/address', body, headers);
}