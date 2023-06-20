import UserService from '../services/userService';
import { Request, Response } from 'express';
import tokenAuth from '../services/tokenService';
import * as bcrypt from 'bcryptjs';
import ErrorHttp from '../middlewares/utils';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    await UserService.validateBody(req.body);
    const { email, password } = req.body;
    const checkUser = await UserService.checkLogin(email);
    const comparePass = await bcrypt.compare(password, checkUser.password);
    if (!comparePass) {
      throw new ErrorHttp('Incorrect email or password', 401)
    }
    const token = await tokenAuth.makeToken(checkUser);
    res.json({ token })
  }
}