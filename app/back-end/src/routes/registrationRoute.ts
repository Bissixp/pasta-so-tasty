import { Router } from 'express';
import UserController from '../controllers/userController';

const registrationRoute = Router();

// GET
registrationRoute.post('/', UserController.createAccount);
registrationRoute.post('/findEmail', UserController.findEmail);

export default registrationRoute;
