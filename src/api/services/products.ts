import axiosInstance from "..";
import { IProducts, Products } from "../../types/products";

export const getProducts = async () => {
    const { data } = await axiosInstance.get<Array<Products>>('/products');
	return data;
}

export const getProductById = async (productId: number) => {
    const { data } = await axiosInstance.get<Products>(`/products/${productId}`);
	return data;
}

export const favoriteProduct = async (productId: number) => {
	const { data } = await axiosInstance.post(`/products/favorites/${productId}`);
	return data;
}

export const getFavorites = async () => {
	const { data } = await axiosInstance.get<Array<IProducts>>('/products/favorites');
	return data;
}