import { useMutation, useQuery } from "react-query"
import { addAddressData, getAddresses } from "../api/services/purchases";
import { queryClient } from "../main";

export const useAddress = () => {
	const addresses = useQuery(['addresses'], async () => {
		const data = await getAddresses();
		return data;
	});

	const newAddress = useMutation(async (data: any) => {
		await addAddressData(data);
	}, {onSuccess: () => queryClient.invalidateQueries(['addresses'])});

	return { addresses, newAddress };
}