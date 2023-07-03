import { Router } from 'express';

import UserController from '../controllers/userController';

const loginRoute = Router();

loginRoute.post('/', UserController.login);
loginRoute.get('/validate', UserController.getRole);
loginRoute.get('/username/:searchParam', UserController.getUsername);

export default loginRoute;