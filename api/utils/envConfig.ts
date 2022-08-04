import 'dotenv/config';

export const port = process.env.PORT || 5000;
export const jwtSecret =  process.env.JWT_SECRET;
export const dbUrl = process.env.DATABASE_URL;