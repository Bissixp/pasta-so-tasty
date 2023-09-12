import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMyRecipes } from '../services/requests';
import { Link } from 'react-router-dom';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';

interface RecipeDetailsParams {
  recipeIdName: string;
  [key: string]: string | undefined;
}

const AuthorRecipes: React.FC = () => {
  const { authorId } = useParams<RecipeDetailsParams>();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [authorName, setAuthorName] = useState<string | null>('');
  const { fullName, logged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getRecipes = async (id: number | null) => {
        const response = await fetchMyRecipes(id);
        if (!response) {
          navigate('/404');
        }
        setRecipes(response);
      };
      if (authorId !== undefined) {
        const splitString = authorId.split("-");
        const id = splitString[0];
        const name = splitString.slice(1).join("-").replace(/-/g, ' ');
        const idParsed = parseInt(id, 10);
        setAuthorName(name);
        getRecipes(idParsed);
      }
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [authorId, authorName, navigate]);

  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >

      <div className="recipe-container">
        <h1>{authorName}</h1>
        <h4>{recipes.length} Receitas publicadas</h4>
        {recipes.length > 0 ? (
          <div className="recipe-list">
            {recipes.map((recipe: IRecipe, id: number) => (
              <div key={id} className="recipe-card">
                {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                  <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
                ) : (
                  <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
                )}
                <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`} className='link-class'>
                  <h3>{recipe.recipe_name.charAt(0).toUpperCase() + recipe.recipe_name.slice(1)}</h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Carregando receitas...</p>
        )}
      </div>
    </div>
  );
};

export default AuthorRecipes;