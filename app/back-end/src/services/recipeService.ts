import RecipeIngredients from '../database/models/recipesIngredientsModel';
import Recipes from '../database/models/recipesModel';
import db from '../database/models';
import IRecipe from '../interface/IRecipe';
import ErrorHttp from '../middlewares/utils';

export default class RecipeService {
  static async createRecipe(recipeBody: IRecipe, fileName?: string) {
    const {
      cookAuthor,
      cookName,
      cookPhoto,
      cookInfo,
      cookTime,
      ingredientsRecipe,
      cookType,
      status,
    } = recipeBody;

    const transaction = await db.transaction();
    try {
      const dynamicFields: { [key: string]: string } = {};
      ingredientsRecipe.forEach((ingredient: string, index: number) => {
        const fild = `recipe_ingredient_${index + 1}`;
        dynamicFields[fild] = ingredient;
      });
      const recipe = await RecipeIngredients.create(
        {
          ...dynamicFields,
        },
        { transaction }
      );

      let realCookPhoto = cookPhoto;
      if (fileName && fileName.length) {
        realCookPhoto = fileName;
      }

      await Recipes.create(
        {
          recipe_author_name: cookAuthor,
          recipe_name: cookName,
          recipe_photo: realCookPhoto,
          recipe_ingredients_id: recipe.id,
          recipe_description: cookInfo,
          recipe_cooking_time: cookTime,
          recipe_type: cookType,
          status_recipe: status,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new ErrorHttp('All fields must be filled', 409)
    }
  }

  static async getAllRecipes() {
    try {
      const getAll = await Recipes.findAll({
        where: {
          status_recipe: 'approved',
        }
      });
      return getAll;
    } catch (error) {
      throw new ErrorHttp('error', 404)
    };
  };
};