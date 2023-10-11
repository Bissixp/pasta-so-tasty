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

      <div className="home-recipes">
        <h1>{upperCase} {recipes.length} {recipes.length === 1 ? 'receita' : 'receitas'}</h1>
        {recipes.length > 0 ? (
          <div className="recipe-list">
            {recipes.map((recipe: IRecipe, id: number) => (
              <div key={recipe.id} className='recipe-card'>
                <div className='card_img_container'>
                  <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`} className='link-class'>
                    {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                      <img src={recipe.recipe_photo} alt={recipe.recipe_name} />
                    ) : (
                      <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} width={"200"} height={"150"} />
                    )}
                  </Link>
                </div>
                <div className='card_text_container'>
                  <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`} className='link-class'>
                    <h3>{recipe.recipe_name.charAt(0).toUpperCase() + recipe.recipe_name.slice(1)}</h3>
                  </Link>
                  <div className="recipe-author">
                    <span style={{ marginRight: '5px' }}>Por </span>
                    <Link to={`/receitas/${recipe.author_id}-${recipe.author_name.replace(/\s+/g, '-')}`} className='link-class'>
                      <h4>{recipe.author_name}</h4>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma receita encontrada</p>
        )}
      </div>
    </div >
  );
};

export default SearchRecipes;