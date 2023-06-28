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
    res.json({ data: tokenValidate });
  };

  static async userRegistration(req: Request, res: Response): Promise<void> {
    await UserService.validateBodyRegistration(req.body);
    const { username, password, email } = req.body;
    await UserService.userRegistration(username, password, email);
    res.json({ message: 'User created successfully' });
  };

  static async findUsername(req: Request, res: Response): Promise<void> {
    const { username } = req.body;
    const usarnameExists = await UserService.findUsername(username);

    if (usarnameExists) {
      res.status(200).json({ data: usarnameExists });
    } else {
      res.status(404).json({ data: null });
    };
  };

  static async findEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const emailExists = await UserService.findEmail(email);

    if (emailExists) {
      res.status(200).json({ data: emailExists });
    } else {
      res.status(404).json({ data: null });
    };
  };
};