import UserService from '../services/userService';
import { Request, Response } from 'express';
import tokenAuth from '../services/tokenService';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    await UserService.validateBodyLogin(req.body);
    const { email, password } = req.body;
    const checkUser = await UserService.checkLogin(email, password);
    const token = await tokenAuth.makeToken(checkUser);
    res.json({ token });
  };

  static async getRole(req: Request, res: Response): Promise<void> {
    const auth: any = req.headers.authorization;
    const tokenValidate = await tokenAuth.readToken(auth);
    res.json({ role: tokenValidate.role });
  };

  static async userRegistration(req: Request, res: Response): Promise<void> {
    await UserService.validateBodyRegistration(req.body);
    const { username, password, email } = req.body;
    await UserService.userRegistration(username, password, email);
    res.json({ message: 'User created successfully' });
  };
}