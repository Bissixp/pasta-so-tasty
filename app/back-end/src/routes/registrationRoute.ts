import { Router } from 'express';
import UserController from '../controllers/userController';

const registrationRoute = Router();

registrationRoute.post('/', UserController.createAccount);
// registrationRoute.post('/findUsername', UserController.findUser);
registrationRoute.post('/findEmail', UserController.findEmail);

export default registrationRoute;
