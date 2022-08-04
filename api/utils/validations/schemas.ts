import joi from 'joi';
import { Login, SignUp } from '../../types/users';

export const signUpSchema = joi.object<SignUp>({
    name: joi.string().required(),
    nickname: joi.string().min(4),
    cpf: joi.string().max(11).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
    phone: joi.string() //colocar uma regex aki
});

export const signInSchema = joi.object<Login>({
    login: joi.string().required(),
    password: joi.string().required()
});