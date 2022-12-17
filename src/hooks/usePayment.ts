import { useQuery } from 'react-query';
import { getPayMethod } from '../api/services/purchases';

export const usePayment = () => {
	const payment = useQuery(['payment'], async () => {
		const data = await getPayMethod();
		return data;
	});

	return { payment };
}