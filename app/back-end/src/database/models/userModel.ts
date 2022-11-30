import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id: number;
  username: string;
  password: string;
  email: string;
}


Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(30),
    allowNull: false,
  },
  email: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false
})


export default Users;