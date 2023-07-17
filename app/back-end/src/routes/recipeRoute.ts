import { Router } from 'express';
import RecipeController from '../controllers/recipeController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const recipeRoute = Router();

recipeRoute.post('/create-recipe', RecipeController.createRecipe);
recipeRoute.post('/create-recipe/upload', upload.single('cookPhoto'), RecipeController.createRecipeUpload);
recipeRoute.get('/getAll', RecipeController.getAllRecipes);

export default recipeRoute;