import RecipeService from '../services/recipeService';
import { Request, Response } from 'express';

export default class RecipeController {
  static async createRecipe(req: Request, res: Response): Promise<void> {
    await RecipeService.createRecipe(req.body);
    res.status(201).json({ mensagem: 'Receita criada com sucesso!' });
  };
};