import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestGetRecipe } from '../services/requests';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';

interface RecipeDetailsParams {
  name: string;
  [key: string]: string | undefined;
}

const RecipeDetails: React.FC = () => {
  const { name } = useParams<RecipeDetailsParams>();
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const getRecipe = async (id: string | null, nameRecipe: string) => {
        const response = await requestGetRecipe(`recipe/getRecipe/${id}-${nameRecipe}`);
        if (!response) {
          navigate('/')
        }
        setRecipe(prev => prev = [response]);
      };
      if (name !== undefined) {
        const matchResult = name.match(/^\d+/);
        const formatedId = matchResult ? matchResult[0] : null;
        const splitString = name.split("-");
        const formatedName = splitString.slice(1).join("-");
        getRecipe(formatedId, formatedName);
      }
    } catch (error) {
      console.log(error);
    };
  }, [name, navigate]);

  return (
    <div>
      {recipe.length > 0 ? (
        recipe.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <span>Receita feita por: {recipe.recipe_author_name}</span>
            <br></br>
            {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
              <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
            ) : (
              <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
            )}
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