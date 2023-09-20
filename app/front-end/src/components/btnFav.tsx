import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFav, fetchFav } from '../services/requests';
import { ReactSVG } from 'react-svg';
import pastaSoTastyContext from '../context/context';
import FavoriteFilledIcon from '../images/fav-on.svg';
import FavoriteEmptyIcon from '../images/fav-off.svg';
import IFav from '../interface/IFav';
import '../styles/components/btnFav.css';

const FavoriteButton: React.FC<IFav> = ({ userId, idRecipe }) => {
  const [, setRecipes] = useState<any[]>([]);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { id } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getFav = async () => {
        const payload = {
          userId,
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
  }, [userId, idRecipe]);

  const handleFavoriteClick = async () => {
    if (userId === 0) {
      navigate('/login');
    } else {
      const payload = {
        userId,
        idRecipe: idRecipe || null,
      };

      if (isFavorited) {
        await createFav(payload, id);
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
        await createFav(payload, id);
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
