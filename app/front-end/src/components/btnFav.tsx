import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFav, fetchFav } from '../services/requests';
import { ReactSVG } from 'react-svg';
import FavoriteFilledIcon from '../images/fav-on.svg';
import FavoriteEmptyIcon from '../images/fav-off.svg';
import '../styles/components/btnFav.css';
import IFav from '../interface/IFav';

const FavoriteButton: React.FC<IFav> = ({ idUser, idRecipe }) => {
  const [, setRecipes] = useState<any[]>([]);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getFav = async () => {
        const payload = {
          idUser,
          idRecipe: idRecipe || null,
        };
        const response = await fetchFav(payload);

        if (response !== null) {
          setRecipes(response.data || []);
        } else {
          setRecipes([]);
        }
      };

      const recipeFavId = localStorage.getItem('recipeFavId');
      if (recipeFavId !== null) {
        const recipeFavIdArray = JSON.parse(recipeFavId);
        const numericIdRecipe = Number(idRecipe);

        if (!isNaN(numericIdRecipe) && recipeFavIdArray.includes(numericIdRecipe)) {
          setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
      } else {
        setIsFavorited(false);
      }

      getFav();
    } catch (error) {
    }
  }, [idUser, idRecipe]);

  const handleFavoriteClick = async () => {
    if (idUser === 0) {
      navigate('/login');
    } else {
      const payload = {
        idUser,
        idRecipe: idRecipe || null,
      };

      if (isFavorited) {
        await createFav(payload);
        setRecipes((prevRecipes: any) => prevRecipes.filter((fav: any) => fav.recipe_fav_id !== idRecipe));
        setIsFavorited(false);

        const recipeFavId = localStorage.getItem('recipeFavId');
        if (recipeFavId !== null) {
          const recipeFavIdArray = JSON.parse(recipeFavId);
          const numericIdRecipe = Number(idRecipe);
          if (!isNaN(numericIdRecipe)) {
            const updatedRecipeFavIdArray = recipeFavIdArray.filter((id: number) => id !== numericIdRecipe);
            localStorage.setItem('recipeFavId', JSON.stringify(updatedRecipeFavIdArray));
          }
        }
      } else {
        await createFav(payload);
        setRecipes((prevRecipes: any) => [...prevRecipes, { recipe_fav_id: idRecipe }]);
        setIsFavorited(true);

        const recipeFavId = localStorage.getItem('recipeFavId');
        if (recipeFavId !== null) {
          const recipeFavIdArray = JSON.parse(recipeFavId);
          const numericIdRecipe = Number(idRecipe);
          if (!isNaN(numericIdRecipe) && !recipeFavIdArray.includes(numericIdRecipe)) {
            recipeFavIdArray.push(numericIdRecipe);
            localStorage.setItem('recipeFavId', JSON.stringify(recipeFavIdArray));
          }
        }
      }
    }
  };

  return (
    <button onClick={handleFavoriteClick} className={`button-transparent ${isFavorited ? 'favorited-button' : 'not-favorited-button'}`}>
      <ReactSVG src={isFavorited ? FavoriteFilledIcon : FavoriteEmptyIcon} />
      {isFavorited ? 'Favoritado' : 'Favoritar'}
    </button>
  );
};

export default FavoriteButton;
