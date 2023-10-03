import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMyFavs } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import '../styles/pages/myFavs.css';

const MyFavs: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { id, fullName, logged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/registro');
    }
  }, [navigate, logged]);

  useEffect(() => {
    if (id !== 0) {
      try {
        const getMyRecipes = async () => {
          const response = await fetchMyFavs(id);
          setRecipes(prev => prev = response);
        };
        getMyRecipes();
      } catch (error: any) {
        console.error("Erro:", error.message);
      };
    }
  }, [id, fullName]);


  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <h1 className='fav_title'>Favoritos</h1>
      <div className="home-recipes">
        {recipes.length > 0 ? (
          <div className="recipe-list">
            {recipes.map((recipe: IRecipe) => (
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='no_recipe'>Nenhuma receita adicionada aos favoritos</p>
        )}
      </div >
    </div >
  );
};

export default MyFavs;