import { Router } from 'express';
import UserController from '../controllers/userController';

const registrationRoute = Router();

// POST
registrationRoute.post('/', UserController.createAccount);

export default registrationRoute;
