import { useQuery } from "react-query"
import { getUserInformation } from "../api/services/users";

export const useUserInformation = () => {
	const profile = useQuery(['user-data'], async () => {
		const data = await getUserInformation();
		return data;
	});

	return { profile };
}