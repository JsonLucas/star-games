import { createContext } from "react";

interface LoggedContext{
	isLogged: boolean,
	setIsLogged: (param: boolean) => void
}

export const UserContext = createContext({ } as LoggedContext);