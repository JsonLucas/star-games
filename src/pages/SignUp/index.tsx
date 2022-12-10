import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormSignUp from "../../components/Form/SignUp";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function SignUp() {
	const { getAuth } = useLocalStorage();
	const { setIsLogged } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		const auth = getAuth();
		if(auth){
			setIsLogged(true);
			navigate('/home');
		}
	}, []);

    return (<FormSignUp />);
}