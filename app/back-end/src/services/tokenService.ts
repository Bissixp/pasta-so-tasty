require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "jwt_secret";

export default class token {
  static async makeToken(user: any): Promise<String> {
    const { password, ...restOfUser } = user;
    const payload = {
      data: {
        ...restOfUser,
        logged: true,
      }
    };
    const options = {
      expiresIn: '24h',
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  }

  static async readToken(token: string) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      return null;
    }
  }
}