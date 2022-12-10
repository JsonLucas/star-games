export interface Users {
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

export interface Levels {
	id: number,
    name: string,
    totalPoints: number,
    totalScore: number,
    features: {
        discount: number,
        hasFreeShipping: boolean
    }
}

export interface Cards {
    id?: number,
    name: string,
    number: string,
    cvv: string,
    expirationDate: Date,
    userId?: number
}

export interface Address {
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

export type Login = { login: string } & Pick<Users, 'password'>;
export type SignUp = Users & { confirmPassword: string };