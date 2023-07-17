interface Recipe {
  id: number;
  recipe_author_name: string;
  recipe_name: string;
  recipe_photo: string;
  recipe_ingredients_id: number | null;
  recipe_description: string;
  recipe_cooking_time: number;
  recipe_type: string;
  status_recipe: string;
}

export default Recipe;