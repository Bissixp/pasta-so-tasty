import { Model, INTEGER, STRING, TEXT } from 'sequelize';
import db from '.';

class Recipes extends Model {
  id!: number;
  recipe_author_name!: string;
  recipe_name!: string;
  recipe_photo!: string | FormData | Express.Multer.File;
  recipe_ingredients_id!: number | null;
  recipe_description!: string;
  recipe_cooking_time!: number;
  recipe_type!: string;
  status_recipe!: string;
}

Recipes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    recipe_author_name: {
      type: STRING(30),
      allowNull: false,
    },
    recipe_name: {
      type: STRING(25),
      allowNull: false,
    },
    recipe_photo: {
      type: TEXT,
      allowNull: true,
    },
    recipe_ingredients_id: {
      type: INTEGER,
      allowNull: true,
    },
    recipe_description: {
      type: STRING(255),
      allowNull: false,
    },
    recipe_cooking_time: {
      type: INTEGER,
      allowNull: false,
    },
    recipe_type: {
      type: STRING(10),
      allowNull: false,
    },
    status_recipe: {
      type: STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Recipes',
    timestamps: false,
  }
);

export default Recipes;
