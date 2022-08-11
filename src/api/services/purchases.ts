import axiosInstance from "..";

export const purchase = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchase', body, { headers });
}

export const getHistory = async (headers: any) => {
    return await axiosInstance.get('/purchases/history', headers);
}