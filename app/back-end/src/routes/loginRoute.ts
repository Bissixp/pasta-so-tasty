import { Router } from 'express';

import UserController from '../controllers/userController';

const loginRoute = Router();

loginRoute.post('/', UserController.login);
loginRoute.get('/validate', UserController.authentication);
// loginRoute.get('/username/:searchParam', UserController.findUser);
loginRoute.get('/email/:searchParam', UserController.getUserEmail);
loginRoute.get('/logoff', UserController.logout);

export default loginRoute;
