import { Login, SignUp } from "../../types/users";
import { signInSchema, signUpSchema } from "./schemas";

export const validateSignUp = (data: SignUp) => {
    const { error } = signUpSchema.validate(data);
    if(error) throw { code: 422, error };
}

export const validateSignIn = (data: Login) => {
    const { error } = signInSchema.validate(data);
    if(error) throw { code: 422, error };
}