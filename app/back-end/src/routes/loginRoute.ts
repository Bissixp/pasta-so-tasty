import { Router } from 'express';

import UserController from '../controllers/userController';

const loginRoute = Router();

loginRoute.post('/', UserController.login);
loginRoute.get('/validate', UserController.authentication);
loginRoute.get('/email/:searchParam', UserController.getUserEmail);
loginRoute.get('/logoff', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  UserController.logout(_req, res);
});

export default loginRoute;
