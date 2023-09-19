import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/requests';
import { Link } from 'react-router-dom';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import '../styles/components/allRecipes.css';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    try {
      const getRecipes = async () => {
        const response = await fetchAllRecipes();
        setRecipes(prev => prev = response);
      };
      getRecipes();
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [])

  return (
    <div className="home-recipes">
      <h1>Bem-vindo ao Pasta So Tasty</h1>
      {recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map((recipe: IRecipe, id: number) => (
            <div key={id} className={`recipe-card${recipes.length === 1 ? ' single-card' : ''}`}>
              {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
              ) : (
                <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} width={"200"} height={"150"} />
              )}
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
          ))}
        </div>
      ) : (
        <p>Carregando receitas...</p>
      )}
    </div>
  );
};

export default AllRecipes;