import { Request, Response, NextFunction } from "express";
import usersServices from "../services/users";
import { validateSignIn, validateSignUp } from "../utils/validations/functions";

export const signUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    validateSignUp(body);

    const user = await usersServices.getByEmail(body.email);
    if(user) throw { code: 409, error: 'this user already exists' };

    next();
}

export const signInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    validateSignIn(body);

    const user = await usersServices.login(body.login);
    if(!user) throw { code: 404, error: 'user not found' };

    res.locals.data = { userId: user._id, hashPassword: user.password, password: body.password };
    next();
}
