import { ILevel } from "./levels";

export interface IUser {
	id: number,
	name: string,
	nickname?: string,
	cpf: string,
	email: string,
	password: string,
	phone?: string,
	totalScore: number,
	currentLevelPoints: number,
	levelId: number,
	createdAt: Date,
	updatedAt: Date
};

export interface ICards {
    id?: number,
    name: string,
    number: string,
    cvv: string,
    expirationDate: Date,
    userId?: number
}

export interface IAddress {
    id?: number,
    cep: string,
    city: string,
    complement?: string,
    neighborhood: string,
    number: number,
    state: string,
    street: string,
    userId?: number
}

export type Login = { login: string } & Pick<IUser, 'password'>;
export type SignUp = IUser & { confirmPassword: string };
export type UserData = Pick<IUser, "name" | "nickname" | "email" | "currentLevelPoints"> 
& { level: Pick<ILevel, "id" | "name" | "totalPoints" | "features"> } 
& { address: Array<{
    street: string;
    number: number;
    state: string;
    city: string;
    neighborhood: string;
    complement: string;
    cep: string;
  }>;
} & {
  card: Array<{
    name: string;
    number: string;
    cvv: number;
    expirationDate: Date;
  }>;
};