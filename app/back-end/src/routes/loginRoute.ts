import { Router } from 'express';
import UserController from '../controllers/userController';

const loginRoute = Router();

// GET
loginRoute.get('/email/:searchParam', UserController.getUserEmail);
loginRoute.get('/logoff', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  UserController.logout(_req, res);
});
loginRoute.get('/validate', UserController.authentication);

// POST
loginRoute.post('/', UserController.login);

export default loginRoute;
