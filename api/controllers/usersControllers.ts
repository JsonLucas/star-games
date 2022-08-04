import usersServices from "../services/users";
import { encrypt } from "../utils/encrypt";
import { tokenGeneration } from "../utils/token";
import { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
    const { body } = req;
    const { name, nickname, cpf, email, password, phone } = body;
    const encryptedPassword = encrypt(password);
    await usersServices.create({name, nickname, cpf, email, password: encryptedPassword, phone});
    res.sendStatus(201);
}

export const signInController = async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const token = tokenGeneration(userId);
    res.status(200).send({ token });
}
