import axiosInstance from "..";

export const getLevelByUserId = async (headers: any) => {
	const { data } = await axiosInstance.get('/levels', headers);
	return data;
}