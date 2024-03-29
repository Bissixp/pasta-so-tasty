import { Model, INTEGER, STRING, TEXT } from 'sequelize';
import RecipeIngredients from './recipesIngredientsModel';
import db from '.';

class Recipes extends Model {
  id!: number;
  author_id!: number;
  author_name!: string;
  recipe_name!: string;
  recipe_photo!: string | FormData | Express.Multer.File;
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
    author_id: {
      type: INTEGER,
      allowNull: false,
    },
    author_name: {
      type: STRING(50),
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
    recipe_description: {
      type: TEXT,
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
    recipe_ingredients_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Recipes',
    timestamps: false,
  }
);

Recipes.belongsTo(RecipeIngredients, {
  foreignKey: 'recipe_ingredients_id',
  as: 'ingredients',
});

export default Recipes;
