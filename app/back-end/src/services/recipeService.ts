import RecipeIngredients from '../database/models/recipesIngredientsModel';
import Recipes from '../database/models/recipesModel';
import db from '../database/models';

interface IRecipe {
  cookAuthor: string;
  cookName: string;
  cookPhoto: string | Buffer | null;
  cookInfo: string;
  cookTime: number;
  ingredientsRecipe: string[];
}

export default class RecipeService {
  static async createRecipe({ cookAuthor, cookName, cookPhoto, cookInfo, cookTime, ingredientsRecipe }: IRecipe) {
    const transaction = await db.transaction();
    try {
      const dynamicFields: { [key: string]: string } = {};
      ingredientsRecipe.forEach((ingredient: any, index: number) => {
        const fild = `recipe_ingredient_${index + 1}`;
        dynamicFields[fild] = ingredient;
      });
      const recipe = await RecipeIngredients.create(
        {
          ...dynamicFields,
        },
        { transaction }
      );

      await Recipes.create(
        {
          recipe_author_name: cookAuthor,
          recipe_name: cookName,
          recipe_photo: cookPhoto,
          recipe_ingredients_id: recipe.id,
          recipe_description: cookInfo,
          recipe_cooking_time: cookTime,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      await transaction.rollback();
    }
  }
}