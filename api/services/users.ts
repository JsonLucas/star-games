import { create, getById, getByEmail, getByNickname, login } from '../repositories/users';

const usersServices = { create, getById, getByEmail, getByNickname, login };

export default usersServices;