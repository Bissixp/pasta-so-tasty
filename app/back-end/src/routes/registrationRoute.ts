import { Router } from 'express';
import UserController from '../controllers/userController';

const registrationRoute = Router();

registrationRoute.post('/', UserController.userRegistration);
registrationRoute.post('/findUsername', UserController.findUsername);
registrationRoute.post('/findEmail', UserController.findEmail);

export default registrationRoute;
