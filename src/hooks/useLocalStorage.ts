interface IToken {
	accessToken: string,
	refreshToken: string
}

export const useLocalStorage = () => {
	const setAuth = (token: IToken) => {
		localStorage.setItem('star-games-auth', JSON.stringify(token));
	}

	const getAuth = (): IToken | null => {
		const jsonAuth = localStorage.getItem('star-games-auth');
		if(jsonAuth){
			const auth = JSON.parse(jsonAuth);
			return auth;
		}
		return null;
	}

	const removeAuth = () => {
		localStorage.removeItem('star-games-auth');
	}

	return { setAuth, getAuth, removeAuth }; 
}