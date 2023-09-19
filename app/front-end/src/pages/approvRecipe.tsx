import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllPedingRecipes, approveRecipe, deleteRecipe } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';
import '../styles/pages/approvRecipe.css';

const AprovarReceitas: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { id, fullName, logged, role } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged || role === 'member') {
      navigate('/404');
    }
  }, [navigate, logged, role]);

  useEffect(() => {
    try {
      const getMyRecipes = async () => {
        const response = await fetchAllPedingRecipes();
        setRecipes(prev => prev = response);
      };
      getMyRecipes();
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [id, fullName]);

  const handleAccept = async (id: number) => {
    const confirmMessage = "Você realmente deseja aceitar esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      await approveRecipe(id);
      const response = await fetchAllPedingRecipes();
      setRecipes(prev => prev = response);
      navigate('/aprovar-receitas');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmMessage = "Você realmente deseja excluir esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      await deleteRecipe(id);
      const response = await fetchAllPedingRecipes();
      setRecipes(prev => prev = response);
      navigate('/aprovar-receitas');
    }
  };

  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <div className="home-recipes">
        <h1>Receitas aguardando aprovação</h1>
        {recipes.length > 0 ? (
          <div className="recipe-list">
            {recipes.map((recipe: IRecipe) => (
              <div key={recipe.recipe_name} className={`recipe-card${recipes.length === 1 ? ' single-card' : ''}`}>
                {
                  recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                    <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
                  ) : (
                    <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} width={"200"} height={"150"} />
                  )
                }
                <div className='approv-card-name'>
                  <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`}
                    className='link-name'
                  >
                    <div className='approv-card-h3'>
                      <h3>{recipe.recipe_name}</h3>
                    </div>
                  </Link>
                </div>
                <div>
                  <button onClick={() => handleAccept(recipe.id)} className='btn-visu'>Aceitar</button>
                  <button onClick={() => handleDelete(recipe.id)} className='btn-visu'>Negar</button>
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

export default AprovarReceitas;