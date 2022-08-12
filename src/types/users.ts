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
    name: string,
    number: string,
    cvv: string,
    expirationDate: Date,
}

export type Login = { login: string } & Pick<Users, 'password'>;
export type SignUp = Omit<Users, 'id'>;