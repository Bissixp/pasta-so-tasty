import Joi from "joi";
import bcrypt from 'bcrypt';
import ErrorHttp from '../middlewares/utils';
import Users from '../database/models/userModel';
import IRegister from "../interface/IRegister";
import UserFav from "../database/models/userFavModel";


export default class UserService {
  static async validateBodyLogin(body: string): Promise<any> {
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

  static async validateBodyRegistration(body: string): Promise<any> {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required().max(12).min(3),
        lastName: Joi.string().required().max(12).min(3),
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

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      throw new ErrorHttp('Incorrect password', 401);
    }
    return findUser;
  }

  static async createAccount(accountBody: IRegister, hashPassword: string) {
    const {
      firstName,
      lastName,
      email
    } = accountBody;

    const createrUser = await Users.create({
      first_name: firstName,
      last_name: lastName,
      password: hashPassword,
      email: email,
      role: 'member'
    });
    return createrUser;
  }

  static async findEmail(email: string) {
    const findEmail = await Users.findOne({
      where: {
        email,
      },
    });
    return findEmail;
  };

  static async getUserFavs(idUser: number) {
    const findFavs = await UserFav.findAll({
      where: {
        user_id: idUser,
      },
    });

    const favIds = findFavs.map((fav) => fav.recipe_fav_id);

    return favIds;
  };

  static async getAllFavs(idUser: number) {
    const findFavs = await UserFav.findAll({
      where: {
        user_id: idUser,
      },
    });

    if (idUser === 0) {
      return null;
    } else {
      const favIds = findFavs.map((fav) => fav.recipe_fav_id);
      return favIds;
    }
  };
};