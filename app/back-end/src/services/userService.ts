import Joi from "joi";
import ErrorHttp from '../middlewares/utils';
import Users from '../database/models/userModel';

export default class UserService {
  static async validateBodyLogin(body: string): Promise<void> {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      });
      const result = await schema.validateAsync(body);
      return result;
    }
    catch (error) {
      throw new ErrorHttp('All fields must be filled', 400)
    }
  }

  static async validateBodyRegistration(body: string): Promise<void> {
    try {
      const schema = Joi.object({
        username: Joi.string().required().max(8),
        password: Joi.string().required().min(8),
        email: Joi.string().required().email(),
      });
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

  static async userRegistration(username: string, password: string, email: string) {
    const createrUser = await Users.create({
      username: username,
      password: password,
      email: email,
      role: 'member'
    });
    return createrUser;
  }
}