import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchRecipe } from '../services/requests';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import IngredientsLoader from '../helpers/ingredientsLoader';
import pastaSoTastyContext from '../context/context';
import FavoriteButton from '../components/btnFav';

interface RecipeDetailsParams {
  recipeIdName: string;
  [key: string]: string | undefined;
}

const RecipeDetails: React.FC = () => {
  const { recipeIdName } = useParams<RecipeDetailsParams>();
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  const [savedId, setSavedId] = useState<string | null>('');

  const { id } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getRecipe = async (id: string | null, nameRecipe: string) => {
        const response = await fetchRecipe(id, nameRecipe);
        if (!response) {
          navigate('/404');
        }
        setRecipe(prev => prev = [response]);
      };
      if (recipeIdName !== undefined) {
        const matchResult = recipeIdName.match(/^\d+/);
        const formatedId = matchResult ? matchResult[0] : null;
        const splitString = recipeIdName.split("-");
        const formatedName = splitString.slice(1).join("-");
        setSavedId(formatedId);
        getRecipe(formatedId, formatedName);
      }
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [recipeIdName, navigate]);

  return (
    <div>
      {recipe.length > 0 ? (
        recipe.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <span>Receita feita por: {recipe.author_name}</span>
            <br></br>
            {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
              <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
            ) : (
              <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
            )}
            <br></br>
            <FavoriteButton idUser={id} idRecipe={savedId}></FavoriteButton>
            <h4>Ingredientes:</h4>
            <IngredientsLoader ingredientId={recipe.recipe_ingredients_id} />
            <h4>Modo de Preparo:</h4>
            <h4>Tempo de Preparo:{recipe.recipe_cooking_time}min</h4>
            <p>{recipe.recipe_description}</p>
          </div>
        ))
      ) : (
        <p>Carregando receita...</p>
      )}
    </div>
  );
};

export default RecipeDetails;