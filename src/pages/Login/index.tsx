import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/Form/Login";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Login (){
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

    return (
        <FormLogin />
    );
}