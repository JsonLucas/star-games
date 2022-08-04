export interface User {
    id?: number,
    name: string,
    nickname?: string,
    cpf: string,
    email: string,
    password: string,
    phone?: string,
    levelId?: number,
    createdAt?: Date
};

export type Login = { login: string } & Pick<User, 'password'>;
export type SignUp = Omit<User, 'id' | 'levelId' | 'createdAt'> & {confirmPassword: string};