import RecipeService from '../services/recipeService';
import { Request, Response } from 'express';

export default class RecipeController {
  static async createRecipe(req: Request, res: Response): Promise<void> {
    await RecipeService.createRecipe(req.body);
    res.status(201).json({ message: 'Recipe created successfully!' });
  };

  static async createRecipeUpload(req: Request, res: Response): Promise<void> {
    const file = req.file;
    const bodyData = JSON.parse(req.body.data);
    await RecipeService.createRecipe(bodyData, file?.filename);
    res.status(201).json({ message: 'Recipe created successfully!' });
  };

  static async getAllRecipes(_req: Request, res: Response): Promise<void> {
    const data = await RecipeService.getAllRecipes();
    res.status(201).json({ data });
  };
};