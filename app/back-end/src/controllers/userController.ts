import UserService from '../services/userService';
import { Request, Response } from 'express';
import tokenAuth from '../services/tokenService';

const MAX_AGE = 24 * 60 * 60 * 1000; //24 horas;

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const loginValidation = await UserService.validateBodyLogin(req.body);
    const { email, password } = loginValidation;
    const checkUser = await UserService.checkLogin(email, password);
    const token = await tokenAuth.makeToken(checkUser);
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: MAX_AGE });
    res.json(token);
  };

  static async authentication(req: Request, res: Response): Promise<void> {
    const auth: string = req.cookies.jwt;
    const tokenValidate = await tokenAuth.readToken(auth);
    res.json(tokenValidate);
  };

  static async createAccount(req: Request, res: Response): Promise<void> {
    const accountValidation = await UserService.validateBodyRegistration(req.body);
    await UserService.createAccount(accountValidation);
    const { email, password } = accountValidation;
    const userLogin = await UserService.checkLogin(email, password);
    const token = await tokenAuth.makeToken(userLogin);
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: MAX_AGE });
    res.status(200).json({ message: 'User created successfully' });
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

  static async getUserEmail(req: Request, res: Response): Promise<void> {
    const usernameParam = req.params.searchParam;
    const getEmail = await UserService.findEmail(usernameParam);
    res.status(200).json({ data: getEmail });
  };

  static async logout(req: Request, res: Response): Promise<Response | void> {
    res.clearCookie('jwt');
    res.cookie('jwt', '', { httpOnly: true, maxAge: -1, sameSite: 'lax', path: '/' })
    res.status(200).json({ message: 'logeg out with sucess' })
  }
};