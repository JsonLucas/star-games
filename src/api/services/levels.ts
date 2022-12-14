import axiosInstance from "..";

export const getLevelByUserId = async () => {
	const { data } = await axiosInstance.get('/levels');
	return data;
}