import { Router } from 'express';
import RecipeController from '../controllers/recipeController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const recipeRoute = Router();

recipeRoute.post('/create-recipe', RecipeController.createRecipe);
recipeRoute.post('/create-recipe/upload', upload.single('cookPhoto'), RecipeController.createRecipeUpload);
recipeRoute.post('/favorites', RecipeController.addFav);
recipeRoute.delete('/favorites/:idUser/:idRecipe', RecipeController.deleteFav);
recipeRoute.get('/favorites/:idUser/:idRecipe', RecipeController.getFav);
recipeRoute.get('/all-favorites/:id', RecipeController.getAllFavs);
recipeRoute.get('/getAll', RecipeController.getAllRecipes);
recipeRoute.get('/getTypeRecipes/:searchParam', RecipeController.getTypeRecipes);
recipeRoute.get('/getRecipe/:id-:name', RecipeController.getRecipe);
recipeRoute.get('/getMyRecipe/:id', RecipeController.getMyRecipes);
recipeRoute.get('/getMyFavs/:id', RecipeController.getMyFavs);
recipeRoute.get('/getIngredients/:id', RecipeController.getIngredients);

export default recipeRoute;