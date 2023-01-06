import { createContext } from "react";
import { UserLevel } from "../types/levels";

interface ILoggedContext{
	isLogged: boolean,
	userLevel?: UserLevel,
	setIsLogged: (param: boolean) => void,
	setUserLevel?: (param: UserLevel) => void
}

export const UserContext = createContext({ } as ILoggedContext);