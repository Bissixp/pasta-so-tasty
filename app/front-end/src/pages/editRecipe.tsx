import React, { useEffect, useState, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { fetchRecipe, editRecipe, editRecipeUpload, fetchRecipeIngredients } from "../services/requests";
import IEditRecipe from "../interface/IEditRecipe";
import pastaSoTastyContext from '../context/context';
import '../styles/pages/recipe.css';

interface RecipeDetailsParams {
  recipeId: string;
  [key: string]: string | undefined;
}

const EditRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoLink, setPhotoLink] = useState<string>('');
  const [ingredients, setIngredients] = useState<{ name: string; value: string; }[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('');
  const [idRecipe, setIdRecipe] = useState<number>(0);
  const [authorId, setAuthorId] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  const { recipeIdName } = useParams<RecipeDetailsParams>();

  const { id, role, fullName, logged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getRecipe = async (id: string | null, nameRecipe: string) => {
        const response = await fetchRecipe(id, nameRecipe);
        setAuthorId(response.author_id);
        setRecipeName(response.recipe_name);
        setSelectedType(response.recipe_type);
        setPhotoLink(response.recipe_photo);
        setRecipeDescription(response.recipe_description);
        setPreparationTime(response.recipe_cooking_time);
        if (!response) {
          navigate('/404');
        }
      };
      const getIngredients = async (id: number) => {
        const response = await fetchRecipeIngredients(id);
        const recipeIngredientsArray = Object.entries(response).map(([key, value]) => ({
          name: key,
          value: value,
        }));
        setIngredients(recipeIngredientsArray);
      }
      if (recipeIdName !== undefined) {
        const matchResult = recipeIdName.match(/^\d+/);
        const formatedId = matchResult ? matchResult[0] : null;
        const splitString = recipeIdName.split("-");
        const formatedName = splitString.slice(1).join("-");
        const formatedIdNumber = Number(formatedId);
        setIdRecipe(formatedIdNumber);
        getRecipe(formatedId, formatedName);
        getIngredients(formatedIdNumber);
      }
    } catch (error: any) {
      console.error("Erro:", error.message);
    };
  }, [recipeIdName, navigate]);


  useEffect(() => {
    if (!logged) {
      navigate('/home');
    }
  }, [navigate, logged, id, authorId, role]);

  const isFormValid = !!(recipeName && (selectedFile || photoLink) && ingredients.length && recipeDescription && preparationTime);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setPhotoLink('');
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const link = event.target.value;
    setPhotoLink(link);
    setSelectedFile(null);
  };

  const handleAddIngredient = () => {
    if (ingredients.length < 15) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        { name: '', value: ingredientInput },
      ]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handlePreparationTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    let parsedTime = parseInt(inputTime, 10);

    if (isNaN(parsedTime) || parsedTime < 0) {
      parsedTime = 0;
    }

    setPreparationTime(parsedTime);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    let roleCheck: string = 'pending';
    if (role === 'admin') {
      roleCheck = 'approved'
    }

    const confirmMessage = "Você realmente deseja editar esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      try {
        if (selectedFile !== null) {
          const cookPhoto = new FormData();
          cookPhoto.append('cookPhoto', selectedFile);

          const ingredientValues = ingredients.map((ingredient) => ingredient.value);

          const payload: IEditRecipe = {
            authorId: id,
            authorName: fullName,
            cookName: recipeName,
            cookPhoto: null,
            cookInfo: recipeDescription,
            cookTime: preparationTime,
            ingredientsRecipe: ingredientValues,
            cookType: selectedType,
            status: roleCheck,
          };

          cookPhoto.append('data', JSON.stringify(payload));

          await editRecipeUpload(cookPhoto, idRecipe, authorId);
          setShowButton(true);

        } else {
          const ingredientValues = ingredients.map((ingredient) => ingredient.value);

          const payload: IEditRecipe = {
            authorId: id,
            authorName: fullName,
            cookName: recipeName,
            cookPhoto: photoLink,
            cookInfo: recipeDescription,
            cookTime: preparationTime,
            ingredientsRecipe: ingredientValues,
            cookType: selectedType,
            status: roleCheck,
          };

          await editRecipe(payload, idRecipe, authorId);
          setShowButton(true);
        };
      } catch (error: any) {
        console.error("Erro:", error.message);
      }
    }
  };

  return (
    <div className="recipe-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label htmlFor="recipe-name">
          <h4>Nome da receita</h4>
          <input
            type="text"
            id="recipe-name"
            maxLength={40}
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
            readOnly={showButton}
          />
        </label>
        <div>
          <label htmlFor="recipe-type">
            <h4>Tipo de Receita</h4>
            <select id="recipe-type" value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              disabled={showButton}>
              <option value="" disabled>Selecione o tipo</option>
              <option value="Carne">Carne</option>
              <option value="Massa">Massa</option>
              <option value="Ave">Ave</option>
              <option value="Pão">Pão</option>
              <option value="Sopa">Sopa</option>
            </select>
          </label>
        </div>
        <div>
          <h4>Foto da receita</h4>
          <input
            type="file"
            id="cookPhoto"
            name="cookPhoto"
            onChange={handleFileChange}
            disabled={showButton}
          />
          <p>Ou</p>
          <input
            type="text"
            id="cookPhoto"
            placeholder="Insira o link da foto"
            value={photoLink}
            onChange={handleLinkChange}
            readOnly={showButton}
          />
          {selectedFile && <p>Nome do arquivo: {selectedFile.name}</p>}
        </div>
        <div>
          <label htmlFor="recipe-ingredient">
            <h4>Informe os ingredientes da receita</h4>
            <h4>Quantidade e Ingrediente</h4>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={ingredient.value}
                  maxLength={50}
                  onChange={(event) => {
                    const updatedIngredients = [...ingredients];
                    updatedIngredients[index] = {
                      ...ingredient,
                      value: event.target.value,
                    };
                    setIngredients(updatedIngredients);
                  }}
                  readOnly={showButton}
                />
                {!showButton && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    disabled={showButton}
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            {!showButton && ingredients.length < 15 && (
              <div>
                <input
                  type="text"
                  value={ingredientInput}
                  maxLength={50}
                  onChange={(event) => setIngredientInput(event.target.value)}
                  disabled={showButton}
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  disabled={showButton}
                >
                  Adicionar
                </button>
              </div>
            )}
          </label>
        </div>
        <label htmlFor="recipe-description">
          <h4>Modo de preparo</h4>
          <textarea
            id="recipe-description"
            value={recipeDescription}
            maxLength={5000}
            onChange={(event) => setRecipeDescription(event.target.value)}
            readOnly={showButton}
          />
        </label>
        <div>
          <label htmlFor="preparation-time">
            <h4> Tempo de Preparo (minutos)</h4>
            <input
              id="preparation-time"
              type="number"
              value={preparationTime}
              min="0"
              step="1"
              onChange={handlePreparationTimeChange}
              readOnly={showButton}
            />
          </label>
        </div>
        {!showButton && (
          <button type="submit" className="btn-edit" disabled={!isFormValid}>
            Editar
          </button>
        )}
        {showButton && (
          <div className="centered-button">
            <Link to="/" className="home-button">Agora só aguardar a aprovação da edição da receita!</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditRecipe;
