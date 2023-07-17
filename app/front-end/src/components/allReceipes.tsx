import { useEffect, useState } from 'react';
import { requestGetAllRecipes } from '../services/requests';
import IRecipe from '../interface/IRecipe';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    try {
      const getRecipes = async () => {
        const response = await requestGetAllRecipes('recipe/getAll');
        setRecipes(response);
      };
      getRecipes();
    } catch (error) {
      console.log(error);
    };
  })

  return (
    <div>
      <h1>Lista de Receitas</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <h3>{recipe.recipe_name}</h3>
            <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
          </div>
        ))
      ) : (
        <p>Carregando receitas...</p>
      )}
    </div>
  );
};

export default AllRecipes;