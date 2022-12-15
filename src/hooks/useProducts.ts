import { useQuery } from 'react-query';
import { getProducts } from '../api/services/products';
import { getHistory } from '../api/services/purchases';

export const useProducts = () => {
	const products = useQuery(['products'], async () => {
		const data = await getProducts();
		return data;
	});

	const historyList = useQuery(['history-list'], async () => {
		const data = await getHistory();
		return data;
	});

	return { products, historyList };
}