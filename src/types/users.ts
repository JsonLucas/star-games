export interface Users {
    _id?: string,
    name: string
    nickname?: string
    cpf: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
};

export interface Levels {
    name: string,
    levelNumber: number,
    totalPoints: number,
    totalScore: number,
    features: {
        discount: number,
        shipping: boolean
    }
}

export interface Cards {
    _id?: string,
    name: string,
    number: string,
    cvv: string,
    expirationDate: Date,
    userId?: number
}

export interface Address {
    _id?: string,
    cep: string,
    city: string,
    complement?: string,
    neighborhood: string,
    number: number,
    state: string,
    street: string,
    userId?: string
}

export type Login = { login: string } & Pick<Users, 'password'>;
export type SignUp = Omit<Users, 'id'>;