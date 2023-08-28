import React, { useEffect, useState } from 'react';
import { fetchRecipeIngredients } from '../services/requests';

interface IngredientsLoaderProps {
  ingredientId: number | null;
}

const IngredientsLoader: React.FC<IngredientsLoaderProps> = ({ ingredientId }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const findIngredients = async (id: number) => {
    try {
      const ingredientsObject = await fetchRecipeIngredients(id);
      const ingredientsArray = Object.values(ingredientsObject).map(String);
      return ingredientsArray;
    } catch (error: any) {
      return [];
    }
  };

  useEffect(() => {
    if (ingredientId !== null) {
      const ingredientsLoad = async () => {
        const ingredients = await findIngredients(ingredientId);
        setIngredients(ingredients);
      };

      ingredientsLoad();
    }
  }, [ingredientId]);

  return (
    <div>
      {ingredients.length > 0 ? (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>Carregando ingredientes...</p>
      )}
    </div>
  );
};

export default IngredientsLoader;
