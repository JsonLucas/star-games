import { useMutation, useQuery } from 'react-query';
import { favoriteProduct, getFavorites, getProducts } from '../api/services/products';
import { getHistory } from '../api/services/purchases';
import { queryClient } from '../main';

export const useProducts = () => {
	const products = useQuery(['products'], async () => {
		const data = await getProducts();
		return data;
	});

	const historyList = useQuery(['history-list'], async () => {
		const data = await getHistory();
		return data;
	});

	const favorites = useQuery(['favorites'], async () => {
		const data = await getFavorites();
		return data;
	});

	const { mutateAsync } = useMutation(async (productId: number) => {
		await favoriteProduct(productId);
	}, { onSuccess: () => queryClient.invalidateQueries('products') }); 

	return { 
		products, 
		historyList, 
		favorites, 
		favoriteProduct: mutateAsync 
	};
}