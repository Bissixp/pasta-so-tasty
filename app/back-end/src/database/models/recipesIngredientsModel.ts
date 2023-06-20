import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Recipes from './recipesModel';

class RecipeIngredients extends Model {
  id: number;
  recipe_author_name: String;
  recipe_ingredient_1: String;
  recipe_ingredient_2: String;
  recipe_ingredient_3: String;
  recipe_ingredient_4: String;
  recipe_ingredient_5: String;
  recipe_ingredient_6: String;
  recipe_ingredient_7: String;
  recipe_ingredient_8: String;
  recipe_ingredient_9: String;
  recipe_ingredient_10: String;
  recipe_ingredient_11: String;
  recipe_ingredient_12: String;
  recipe_ingredient_13: String;
  recipe_ingredient_14: String;
  recipe_ingredient_15: String;
  recipe_ingredient_16: String;
  recipe_ingredient_17: String;
  recipe_ingredient_18: String;
  recipe_ingredient_19: String;
  recipe_ingredient_20: String;
}


RecipeIngredients.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
    references: {
      model: "Recipes",
      key: "id"
    },
  },
  recipe_ingredient_1: {
    type: STRING(15),
    allowNull: false,
  },
  recipe_ingredient_2: {
    type: STRING(15),
    allowNull: false,
  },
  recipe_ingredient_3: {
    type: STRING(15),
    allowNull: false,
  },
  recipe_ingredient_4: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_5: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_6: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_7: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_8: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_9: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_10: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_11: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_12: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_13: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_14: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_15: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_16: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_17: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_18: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_19: {
    type: STRING(15),
    allowNull: true,
  },
  recipe_ingredient_20: {
    type: STRING(15),
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'RecipeIngredients',
  timestamps: false
})


export default RecipeIngredients;

Recipes.belongsTo(RecipeIngredients)
RecipeIngredients.belongsTo(Recipes)
