import { Router } from 'express';

import RecipeController from '../controllers/recipeController';

const recipeRoute = Router();

recipeRoute.post('/create-recipe', RecipeController.createRecipe);

export default recipeRoute;
