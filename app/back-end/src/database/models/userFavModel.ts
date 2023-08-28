import { Model, INTEGER } from 'sequelize';
import db from '.';
import Users from './userModel';

class UserFav extends Model {
  id!: number;
  user_id!: number;
  recipe_fav_id!: number;
}

UserFav.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    user_id: {
      type: INTEGER,
      allowNull: true,
    },
    recipe_fav_id: {
      type: INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'UsersFavs',
    timestamps: false,
  }
);

UserFav.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'user',
});

export default UserFav;
