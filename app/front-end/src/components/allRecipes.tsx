import { useEffect, useState } from 'react';
import { requestGetAllRecipes } from '../services/requests';
import { Link } from 'react-router-dom';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    try {
      const getRecipes = async () => {
        const response = await requestGetAllRecipes('recipe/getAll');
        setRecipes(prev => prev = response);
      };
      getRecipes();
    } catch (error) {
      console.log(error);
    };
  }, [])

  return (
    <div>
      <h1>Lista de Receitas</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <Link to={`/receita/${recipe.id}${'-'}${recipe.recipe_name.split(' ').join('-')}`}
            >
              <h3>{recipe.recipe_name}</h3>
            </Link>
            {
              recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
              ) : (
                <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
              )
            }
          </div>
        ))
      ) : (
        <p>Carregando receitas...</p>
      )}
    </div >
  );
};

export default AllRecipes;