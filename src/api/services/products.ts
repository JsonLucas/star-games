import axiosInstance from "..";
import { IProducts } from "../../types/products";

export const getProducts = async () => {
    return await axiosInstance.get<Array<IProducts>>('/products');
}

export const getProductById = async (productId: string) => {
    return await axiosInstance.get<IProducts>(`/products/${productId}`);
}