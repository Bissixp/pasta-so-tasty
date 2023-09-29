import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  first_name: {
    type: STRING(30),
    allowNull: false,
  },
  last_name: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(60),
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false
});

export default Users;