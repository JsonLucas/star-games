import axiosInstance from "..";

export const purchase = async (body: any, headers: any) => {
    return await axiosInstance.post('/purchase', body, { headers });
}