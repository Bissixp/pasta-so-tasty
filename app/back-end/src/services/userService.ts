import Joi from "joi";
import ErrorHttp from '../middlewares/utils';
import Users from '../database/models/userModel';

export default class UserService {
  static async validateBody(body: string): Promise<void> {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
      })
      const result = await schema.validateAsync(body);
      return result;
    }
    catch (error) {
      throw new ErrorHttp('All fields must be filled', 400)
    }
  }

  static async checkLogin(email: string, password: string): Promise<Users> {
    const findUser = await Users.findOne({
      where: {
        email,
      },
      raw: true,
    })
    if (!findUser?.email) {
      throw new ErrorHttp('Incorrect email', 401);
    }
    if (findUser.password !== password) {
      throw new ErrorHttp('Incorrect password', 401);
    }
    return findUser;
  }
}