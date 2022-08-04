import { Router } from 'express';

const users = Router();
users.post('/sign-up');
users.post('/sign-in');

export default users;