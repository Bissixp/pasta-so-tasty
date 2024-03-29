import RecipeIngredients from '../database/models/recipesIngredientsModel';
import Recipes from '../database/models/recipesModel';
import UserFav from '../database/models/userFavModel';
import db from '../database/models';
import ICreateRecipe from '../interface/ICreateRecipe';
import IEditRecipe from '../interface/IEditRecipe';
import IRecipe from '../interface/IRecipe';
import ErrorHttp from '../middlewares/utils';
import { Op } from 'sequelize';

export default class RecipeService {
  static async createRecipe(recipeBody: ICreateRecipe, fileName?: string) {
    const {
      authorId,
      authorName,
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
        const field = `recipe_ingredient_${index + 1}`;
        dynamicFields[field] = ingredient;
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
          author_id: authorId,
          author_name: authorName,
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
      throw new ErrorHttp('All fields must be filled', 400)
    }
  }

  static async editRecipe(recipeBody: IEditRecipe, id: number, fileName?: string) {
    const {
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
      const existingRecipe = await Recipes.findOne({
        where: {
          id: id,
        },
        transaction,
      });

      if (!existingRecipe) {
        throw new ErrorHttp('recipe not found', 404);
      }

      let realCookPhoto = cookPhoto;
      if (fileName && fileName.length) {
        realCookPhoto = fileName;
      }

      existingRecipe.recipe_name = cookName;
      existingRecipe.recipe_photo = realCookPhoto;
      existingRecipe.recipe_description = cookInfo;
      existingRecipe.recipe_cooking_time = cookTime;
      existingRecipe.recipe_type = cookType;
      existingRecipe.status_recipe = status;

      await existingRecipe.save({ transaction });

      const existingIngredients = await RecipeIngredients.findOne({
        where: {
          id: id,
        },
        transaction,
      });

      if (!existingIngredients) {
        throw new ErrorHttp('ingredients not found', 404);
      }

      const MAX_NUM_INGREDIENTS = 15;
      for (let i = ingredientsRecipe.length; i < MAX_NUM_INGREDIENTS; i++) {
        const field = `recipe_ingredient_${i + 1}`;
        existingIngredients.setDataValue(field, null);
      }

      ingredientsRecipe.forEach((ingredient, index) => {
        const field = `recipe_ingredient_${index + 1}`;
        existingIngredients.setDataValue(field, ingredient);
      });

      await existingIngredients.save({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
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
      throw new ErrorHttp('Recipes not found', 404)
    };
  };

  static async getTypeRecipes(typeRecipe: string) {
    try {
      const getAll = await Recipes.findAll({
        where: {
          recipe_type: typeRecipe,
          status_recipe: 'approved',
        }
      });
      return getAll;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  };

  static async getRecipe(id: number, name: string) {
    try {
      const getRecipe = await Recipes.findOne({
        where: {
          id,
          recipe_name: name,
        }
      });
      return getRecipe;
    } catch (error) {
      throw new ErrorHttp('Recipe not found', 404)
    };
  };

  static async getMyRecipes(id: number) {
    try {
      const getMyRecipes = await Recipes.findAll({
        where: {
          author_id: id,
          status_recipe: 'approved'
        }
      });
      return getMyRecipes;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  };

  static async getRecipeById(id: number) {
    try {
      const getRecipe = await Recipes.findOne({
        where: {
          id,
        }
      });
      return getRecipe;
    } catch (error) {
      throw new ErrorHttp('Recipe not found', 404)
    };
  };


  static async getMyFavs(id: number): Promise<IRecipe[]> {
    try {
      const getMyFavs = await UserFav.findAll({
        where: {
          user_id: id,
        }
      });
      const favIds = getMyFavs.map((fav) => fav.recipe_fav_id);
      const favRecipes: IRecipe[] = [];
      await Promise.all(favIds.map(async (favId) => {
        const recipe = await this.getRecipeById(favId);
        if (recipe) {
          const {
            id,
            author_id,
            author_name,
            recipe_name,
            recipe_photo,
            recipe_description,
            recipe_cooking_time,
            recipe_type,
            status_recipe,
            recipe_ingredients_id,
          } = recipe.dataValues;

          favRecipes.push({
            id,
            author_id,
            author_name,
            recipe_name,
            recipe_photo,
            recipe_description,
            recipe_cooking_time,
            recipe_type,
            status_recipe,
            recipe_ingredients_id,
          });
        }
      }));
      return favRecipes;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  };

  static async getIngredients(id: number) {
    try {
      const getIngredients = await RecipeIngredients.findOne({
        where: {
          id,
        }
      });

      if (!getIngredients) {
        return null;
      }

      const ingredientFields: { [key: string]: string } = {};
      const numIngredients = 15;
      for (let i = 1; i <= numIngredients; i++) {
        const fieldName = `recipe_ingredient_${i}`;
        const fieldValue = getIngredients.get(fieldName) as string;
        if (fieldValue !== null) {
          ingredientFields[fieldName] = fieldValue;
        }
      }
      return ingredientFields;
    } catch (error) {
      throw new ErrorHttp('Ingredients not found', 404)
    }
  };

  static async addFav(userId: number, idRecipe: number) {
    try {
      const existingFav = await UserFav.findOne({
        where: {
          user_id: userId,
          recipe_fav_id: idRecipe,
        },
      });

      if (existingFav) {
        await UserFav.destroy({
          where: {
            user_id: userId,
            recipe_fav_id: idRecipe,
          },
        });
      } else {
        await UserFav.create({
          user_id: userId,
          recipe_fav_id: idRecipe,
        });
      }
    } catch (error) {
      throw new ErrorHttp('Error adding to favorites', 404);
    }
  }

  static async getFav(userId: number, idRecipe: number) {
    try {
      const fav = await UserFav.findOne({
        where: {
          user_id: userId,
          recipe_fav_id: idRecipe,
        }
      });
      return fav ? [fav] : [];
    } catch (error) {
      throw new ErrorHttp('error to localize favorite', 404)
    };
  }

  static async pedingRecipes(id: number) {
    try {
      const pedingRecipes = await Recipes.findAll({
        where: {
          author_id: id,
          status_recipe: 'pending',
        }
      });
      return pedingRecipes;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  }

  static async getAllPedingRecipes() {
    try {
      const pedingRecipes = await Recipes.findAll({
        where: {
          status_recipe: 'pending',
        }
      });
      return pedingRecipes;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  }

  static async getRecipesByName(name: string) {
    try {
      const allRecipes = await Recipes.findAll({
        where: {
          recipe_name: {
            [Op.like]: `%${name}%`,
          },
          status_recipe: 'approved',
        },
      });
      return allRecipes;
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  }

  static async approveRecipe(id: number) {
    try {
      const approveRecipes = await Recipes.findOne({
        where: {
          id: id,
          status_recipe: 'pending',
        }
      });
      if (!approveRecipes) {
        throw new ErrorHttp('Recipe not found or already approved', 404);
      }
      await Recipes.update(
        { status_recipe: 'approved' },
        { where: { id: id } }
      );
    } catch (error) {
      throw new ErrorHttp('Recipes not found', 404)
    };
  }

  static async deleteRecipe(id: number) {
    try {
      const recipeToDelete = await Recipes.findOne({
        where: {
          id: id,
          status_recipe: 'pending',
        }
      });
      if (!recipeToDelete) {
        throw new ErrorHttp('Recipe not found or not pending', 404);
      }
      await Recipes.destroy({
        where: { id: id },
      });
      await RecipeIngredients.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw new ErrorHttp('Error deleting recipe', 500);
    }
  }

  static async deleteRecipePosted(id: number) {
    try {
      const recipeToDelete = await Recipes.findOne({
        where: {
          id: id,
        }
      });

      if (!recipeToDelete) {
        throw new ErrorHttp('Recipe not found or not pending', 404);
      };

      const ingredientsToDelete = await RecipeIngredients.findOne({
        where: {
          id: id,
        }
      });
      if (!ingredientsToDelete) {
        throw new ErrorHttp('ingredients not found', 404);
      };

      await Recipes.destroy({
        where: { id: id },
      });
      await RecipeIngredients.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw new ErrorHttp('Error deleting recipe', 500);
    }
  }
}