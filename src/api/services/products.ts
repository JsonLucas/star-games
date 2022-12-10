import axiosInstance from "..";
import { IProducts } from "../../types/products";

export const getProducts = async () => {
    const { data } = await axiosInstance.get<Array<IProducts>>('/products');
	return data;
}

export const getProductById = async (productId: string) => {
    const { data } = await axiosInstance.get<IProducts>(`/products/${productId}`);
	return data;
}