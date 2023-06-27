import { Router } from 'express';
import UserController from '../controllers/userController';

const registrationRoute = Router();

registrationRoute.post('/', UserController.userRegistration);

export default registrationRoute;
