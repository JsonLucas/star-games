import { Request, Response, NextFunction } from 'express';

interface Error {
    code: number,
    error: string | object
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {}

export default errorHandler;