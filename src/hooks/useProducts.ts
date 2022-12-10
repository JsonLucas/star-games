import { useQuery } from 'react-query';
import { getProducts } from '../api/services/products';

export const useProducts = () => {
	const products = useQuery(['products'], async () => {
		const data = await getProducts();
		return data;
	});

	return { products };
}