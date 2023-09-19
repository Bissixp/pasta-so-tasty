import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMyPedingRecipes } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';

const PendingApprov: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { id, fullName, logged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/registro');
    }
  }, [navigate, logged]);

  useEffect(() => {
    try {
      const getMyRecipes = async () => {
        const response = await fetchMyPedingRecipes(id);
        setRecipes(prev => prev = response);
      };
      getMyRecipes();
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [id, fullName]);


  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <h1>Receitas aguardando a Aprovação</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name} className={`recipe-card${recipes.length === 1 ? ' single-card' : ''}`}>
            <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`}
            >
              <h3>{recipe.recipe_name}</h3>
            </Link>
            {
              recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
              ) : (
                <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} width={"200"} height={"150"} />
              )
            }
          </div>
        ))
      ) : (
        <p>No momento, sem receitas aguardando a Aprovação</p>
      )}
    </div >
  );
};

export default PendingApprov;