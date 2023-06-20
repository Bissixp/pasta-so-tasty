import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import RecipeIngredients from './recipesIngredientsModel';

class Recipes extends Model {
  id: Number;
  recipe_author_name: String;
  recipe_name: String;
  recipe_photo: String;
  recipe_ingredients_id: Number;
  recipe_description: String;
  recipe_cooking_time: Number;
}


Recipes.init({
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
    type: STRING(100),
    allowNull: false,
  },
  recipe_ingredients_id: {
    allowNull: true,
    references: {
      model: "RecipeIngredients",
      key: "id"
    },
    type: INTEGER,
  },
  recipe_description: {
    type: STRING(255),
    allowNull: false,
  },
  recipe_cooking_time: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Recipes',
  timestamps: false
})


export default Recipes;

Recipes.belongsTo(RecipeIngredients)
RecipeIngredients.belongsTo(Recipes)
