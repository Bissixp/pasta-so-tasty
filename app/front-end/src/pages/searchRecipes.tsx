import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchRecipesByName } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';

const SearchRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { fullName, logged } = useContext(pastaSoTastyContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchRecipe = queryParams.get('query');
  const upperCase = searchRecipe ? searchRecipe.charAt(0).toUpperCase() + searchRecipe.slice(1) : '';

  useEffect(() => {
    try {
      const getSearchRecipes = async () => {
        const response = await fetchRecipesByName(searchRecipe);
        setRecipes(prev => prev = response);
      };
      getSearchRecipes();
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [searchRecipe]);

  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <h1>{upperCase} {recipes.length} {recipes.length === 1 ? 'receita' : 'receitas'}</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`}
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
        <p>Nenhuma receita encontada</p>
      )}
    </div >
  );
};

export default SearchRecipes;