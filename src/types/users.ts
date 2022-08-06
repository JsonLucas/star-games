export interface Users { 
    _id?: string | number,
    name: string
    nickname?: string
    cpf: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
};

export type Login = { login: string } & Pick<Users, 'password'>;
export type SignUp = Omit<Users, 'id'>;