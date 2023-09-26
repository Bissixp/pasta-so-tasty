import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchRecipe, userDeleteRecipe } from '../services/requests';
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


  const redirectToRecipe = (id: number, name: string) => {
    navigate(`/editar-receita/${id}-${name.split(' ').join('-')}`);
  };

  const deleteRecipe = async (id: number, authorId: number) => {
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
                <h3 className='detail_title'>{recipe.recipe_name.toUpperCase()}</h3>
                {recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                  <img src={recipe.recipe_photo} alt={recipe.recipe_name} className="centered-image" />
                ) : (
                  <div className="centered-image">
                    <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} width={"450"} height={"350"} />
                  </div>
                )}
                <FavoriteButton userId={id} idRecipe={savedId} />
                <div className='details_degrade'>
                </div>
                <h4 className='details_sub_title'>Tempo de Preparo: {recipe.recipe_cooking_time}min</h4>
              </div>
              <div className='details_recipe_content'>
                <span>Tipo da Receita: <strong>{recipe.recipe_type}</strong> </span>
                <h4>Ingredientes:</h4>
                <IngredientsLoader ingredientId={recipe.recipe_ingredients_id} />
                <h4>Modo de Preparo:</h4>
                {recipe.recipe_description.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    <p>{line}</p>
                  </React.Fragment>
                ))}
              </div>
              {role === 'admin' && (
                <div className="auth-container">
                  <button onClick={() => redirectToRecipe(recipe.id, recipe.recipe_name)}
                    className="btn-visu btn_edit"
                  >Editar</button>
                  <button onClick={() => deleteRecipe(recipe.id, recipe.author_id)}
                    className="btn-visu btn_delete">
                    Excluir Receita
                  </button>
                </div>
              )}
              {id === recipe.author_id && role === 'member' && (
                <div className="auth-container">
                  <button onClick={() => redirectToRecipe(recipe.id, recipe.recipe_name)}
                    className="btn-visu btn_edit"
                  >Editar</button>
                  <button onClick={() => deleteRecipe(recipe.id, recipe.author_id)}
                    className="btn-visu btn_delete">
                    Excluir Receita
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Carregando receita...</p>
        )}
      </div>
    </div >
  );
};

export default RecipeDetails;