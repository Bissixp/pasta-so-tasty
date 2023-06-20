import { z } from 'zod';
import ErrorHttp from '../middlewares/utils';
import Users from '../database/models/userModel';

export default class UserService {
  static async validateBody(body: string): Promise<void> {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });
      schema.parse(JSON.parse(body));
    } catch (error) {
      throw new ErrorHttp('All fields must be filled', 400);
    }
  }
  static async checkLogin(email: string): Promise<Users> {
    const findUser = await Users.findOne({
      where: {
        email,
      },
      raw: true,
    })
    if (!findUser) {
      throw new ErrorHttp('Incorrect email or password', 401);
    }
    return findUser;
  }
}