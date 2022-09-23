import axiosInstance from "..";

export const getLevelByUserId = async (headers: any) => {
	return await axiosInstance.get('/levels', headers);
}