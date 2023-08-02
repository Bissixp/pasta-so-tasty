import { Model, DataTypes } from 'sequelize';
import db from '.';

class RecipeIngredients extends Model {
  id!: number;
}

interface IngredientFields {
  [fieldName: string]: typeof DataTypes.STRING;
}

const createDynamicIngredientFields = (numIngredients: number): IngredientFields => {
  const fields: IngredientFields = {};
  for (let i = 1; i <= numIngredients; i++) {
    const fieldName = `recipe_ingredient_${i}`;
    fields[fieldName] = DataTypes.STRING;
  }
  return fields;
}

const fields = createDynamicIngredientFields(15);

RecipeIngredients.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ...fields,
  },
  {
    sequelize: db,
    modelName: 'RecipeIngredients',
    timestamps: false,
  }
);

export default RecipeIngredients;
