import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchRecipe, adminDeleteRecipe, userDeleteRecipe } from '../services/requests';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import IngredientsLoader from '../helpers/ingredientsLoader';
import pastaSoTastyContext from '../context/context';
import FavoriteButton from '../components/btnFav';
import Header from "../components/header";
import '../styles/pages/recipeDetails.css';

interface RecipeDetailsParams {
  recipeIdName: string;
  [key: string]: string | undefined;
}

const RecipeDetails: React.FC = () => {
  const { recipeIdName } = useParams<RecipeDetailsParams>();
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  const [savedId, setSavedId] = useState<string | null>('');

  const { id, role, fullName, logged } = useContext(pastaSoTastyContext);

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
  }, [role, recipeIdName, navigate]);

  const admDeleteRecipe = async (id: number) => {
    const confirmMessage = "Você realmente deseja excluir esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      await adminDeleteRecipe(id);
      window.history.back();
    }
  }

  const authorDeleteRecipe = async (id: number, authorId: number) => {
    const confirmMessage = "Você realmente deseja excluir esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      await userDeleteRecipe(id, authorId);
      window.history.back();
    }
  }

  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <div className="details-container">
        {recipe.length > 0 ? (
          recipe.map((recipe: IRecipe) => (
            <div key={recipe.recipe_name}>
              <div className='centered-container'>
                <h3>{recipe.recipe_name}</h3>
              </div>
              <br></br>
              {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                <img src={recipe.recipe_photo} alt={recipe.recipe_name} className="centered-image" />
              ) : (
                <div className="centered-image">
                  <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
                </div>
              )}
              <div className='centered-content'>
                <h4>Tempo de Preparo: {recipe.recipe_cooking_time}min</h4>
              </div>
              <FavoriteButton idUser={id} idRecipe={savedId}></FavoriteButton>
              <br></br>
              <h4>Ingredientes:</h4>
              <IngredientsLoader ingredientId={recipe.recipe_ingredients_id} />
              <h4>Modo de Preparo:</h4>
              {recipe.recipe_description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  <p>{line}</p>
                  <br />
                </React.Fragment>
              ))}
              {role === 'admin' && (
                <button onClick={() => admDeleteRecipe(recipe.id)}
                  className="btn-delete">
                  Excluir Receita
                </button>
              )}
              {id === recipe.author_id && role === 'member' && (
                <button onClick={() => authorDeleteRecipe(recipe.id, recipe.author_id)}
                  className="btn-delete">
                  Excluir Receita
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Carregando receita...</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;