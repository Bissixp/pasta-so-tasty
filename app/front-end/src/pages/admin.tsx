import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllPedingRecipes, approveRecipe, deleteRecipe } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';
import IRecipe from '../interface/IRecipe';
import ImageLoader from '../helpers/imageLoader';

const Admin: React.FC = () => {
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
    await approveRecipe(id);
    const response = await fetchAllPedingRecipes();
    setRecipes(prev => prev = response);
    navigate('/admin');
  };

  const handleDelete = async (id: number) => {
    await deleteRecipe(id);
    const response = await fetchAllPedingRecipes();
    setRecipes(prev => prev = response);
    navigate('/admin');
  };

  return (
    <div>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <h1>Receitas aguardando aprovação</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipe_name}>
            <Link to={`/receita/${recipe.id}-${recipe.recipe_name.split(' ').join('-')}`}
            >
              <h3>{recipe.recipe_name}</h3>
            </Link>
            {
              recipe.recipe_photo.toLowerCase().startsWith('http') ? (
                <img src={recipe.recipe_photo} alt={recipe.recipe_name} width="200" height="150" />
              ) : (
                <ImageLoader photo={recipe.recipe_photo} alt={recipe.recipe_name} />
              )
            }
            <button onClick={() => handleAccept(recipe.id)}>Aceitar</button>
            <button onClick={() => handleDelete(recipe.id)}>Negar</button>
          </div>
        ))
      ) : (
        <p>Nenhuma receita encontrada</p>
      )}
    </div >
  );
};

export default Admin;