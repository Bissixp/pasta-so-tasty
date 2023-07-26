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
    res.status(201).json(data);
  };

  static async getTypeRecipes(req: Request, res: Response): Promise<void> {
    const typeRecipe = req.params.searchParam;
    const data = await RecipeService.getTypeRecipes(typeRecipe);
    res.status(201).json(data);
  };

  static async getRecipe(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = await RecipeService.getRecipe(id);
    res.status(201).json(data);
  };
};