import { Router } from 'express';
import RecipeController from '../controllers/recipeController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const recipeRoute = Router();

recipeRoute.post('/create-recipe', RecipeController.createRecipe);
recipeRoute.post('/create-recipe/upload', upload.single('cookPhoto'), RecipeController.createRecipeUpload);
recipeRoute.post('/favorites', RecipeController.addFav);
recipeRoute.get('/favorites/:idUser/:idRecipe', RecipeController.getFav);
recipeRoute.get('/all-favorites/:id', RecipeController.getAllFavs);
recipeRoute.get('/getAll', RecipeController.getAllRecipes);
recipeRoute.get('/getTypeRecipes/:searchParam', RecipeController.getTypeRecipes);
recipeRoute.get('/getRecipe/:id-:name', RecipeController.getRecipe);
recipeRoute.get('/getMyRecipe/:id', RecipeController.getMyRecipes);
recipeRoute.get('/getMyFavs/:id', RecipeController.getMyFavs);
recipeRoute.get('/getRecipesByName/:name', RecipeController.getRecipesByName);
recipeRoute.get('/getIngredients/:id', RecipeController.getIngredients);
recipeRoute.get('/getAllPending', RecipeController.getAllPedingRecipes);
recipeRoute.patch('/approveRecipe/:id', RecipeController.approveRecipe);
recipeRoute.delete('/deleteRecipe/:id', RecipeController.deleteRecipe);
recipeRoute.get('/pending/:id', RecipeController.pedingRecipes);

export default recipeRoute;