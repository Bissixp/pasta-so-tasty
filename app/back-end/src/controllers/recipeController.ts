import UserService from '../services/userService';
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
    const name = req.params.name.split('-').join(' ');
    const data = await RecipeService.getRecipe(id, name);
    res.status(201).json(data);
  };

  static async getMyRecipes(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = await RecipeService.getMyRecipes(id);
    res.status(201).json(data);
  };

  static async getMyFavs(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = await RecipeService.getMyFavs(id);
    res.status(201).json(data);
  };

  static async getIngredients(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = await RecipeService.getIngredients(id);
    res.status(201).json(data);
  };

  static async addFav(req: Request, res: Response): Promise<void> {
    const { idUser, idRecipe } = req.body;
    await RecipeService.addFav(idUser, idRecipe);
    res.status(201).json({ message: 'Recipe added to favorites successfully!' });
  };
  
  static async getFav(req: Request, res: Response): Promise<void> {
    const idUser = parseInt(req.params.idUser, 10);
    const idRecipe = parseInt(req.params.idRecipe, 10);
    const fav = await RecipeService.getFav(idUser, idRecipe);
    res.status(201).json(fav);
  };

  static async getAllFavs(req: Request, res: Response): Promise<void> {
    const idUser = parseInt(req.params.id, 10);
    const updatedFavIds = await UserService.getAllFavs(idUser);
    if (updatedFavIds) {
      res.status(201).json(updatedFavIds);
    } else {
      res.status(201).json(null);
    }
  };

  static async pedingRecipes(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const data = await RecipeService.pedingRecipes(id);
    res.status(201).json(data);
  };

  static async getRecipesByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const data = await RecipeService.getRecipesByName(name);
    res.status(201).json(data);
  };
};