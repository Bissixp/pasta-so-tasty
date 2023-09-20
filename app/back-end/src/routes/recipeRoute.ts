import { Router } from 'express';
import { authenticateMiddleware, isUser, isAdmin, checkUser } from '../middlewares/authenticateHandlerMiddleware';
import RecipeController from '../controllers/recipeController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const recipeRoute = Router();

// GET
recipeRoute.get('/all-favorites/:id', RecipeController.getAllFavs);
recipeRoute.get('/favorites/:idUser/:idRecipe', RecipeController.getFav);
recipeRoute.get('/getAll', RecipeController.getAllRecipes);
recipeRoute.get('/getTypeRecipes/:searchParam', RecipeController.getTypeRecipes);
recipeRoute.get('/getRecipe/:id-:name', RecipeController.getRecipe);
recipeRoute.get('/getMyRecipe/:id', RecipeController.getMyRecipes);
recipeRoute.get('/getMyFavs/:id', authenticateMiddleware, checkUser, RecipeController.getMyFavs);
recipeRoute.get('/getRecipesByName/:name', RecipeController.getRecipesByName);
recipeRoute.get('/getIngredients/:id', RecipeController.getIngredients);
recipeRoute.get('/getAllPending', authenticateMiddleware, isAdmin, RecipeController.getAllPedingRecipes);
recipeRoute.get('/pending/:id', authenticateMiddleware, checkUser, RecipeController.pedingRecipes);

// PUT
recipeRoute.put('/edit-recipe/:id/:authorId', authenticateMiddleware, isUser, RecipeController.editRecipe);
recipeRoute.put('/edit-recipe/upload/:id/:authorId', authenticateMiddleware, isUser, upload.single('cookPhoto'), RecipeController.editRecipeUpload);
recipeRoute.patch('/approveRecipe/:id', authenticateMiddleware, isAdmin, RecipeController.approveRecipe);

// POST
recipeRoute.post('/create-recipe/:userId', authenticateMiddleware, checkUser, RecipeController.createRecipe);
recipeRoute.post('/create-recipe/upload/:userId', authenticateMiddleware, checkUser, upload.single('cookPhoto'), RecipeController.createRecipeUpload);
recipeRoute.post('/favorites/:userId', authenticateMiddleware, checkUser, RecipeController.addFav);

// DELETE
recipeRoute.delete('/deleteRecipe/:id', authenticateMiddleware, isAdmin, RecipeController.deleteRecipe);
recipeRoute.delete('/deleteRecipePosted/:id/:authorId', authenticateMiddleware, isUser, RecipeController.deleteRecipePosted);

export default recipeRoute;