import React, { useEffect, useState, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { createRecipe, createUpload } from "../services/requests";
import ICreateRecipe from "../interface/ICreateRecipe";
import pastaSoTastyContext from '../context/context';
import ConfirmRedirect from "../helpers/ConfirmRedirect";
import '../styles/pages/recipe.css';

const Recipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoLink, setPhotoLink] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('');
  const [showButton, setShowButton] = useState<boolean>(false);
  const [ingredientEditMode, setIngredientEditMode] = useState<boolean[]>([]);


  const { id, role, fullName, logged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

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
    if (ingredientInput.trim() !== '') {
      if (ingredients.length < 15) {
        setIngredients((prevIngredients) => [...prevIngredients, ingredientInput]);
        setIngredientEditMode((prevEditMode) => [...prevEditMode, false]);
        setIngredientInput('');
      }
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
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

    const confirmMessage = "Você realmente deseja criar esta receita?";
    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      try {
        if (selectedFile !== null) {
          const cookPhoto = new FormData();
          cookPhoto.append('cookPhoto', selectedFile);

          const payload: ICreateRecipe = {
            authorId: id,
            authorName: fullName,
            cookName: recipeName,
            cookPhoto: null,
            cookInfo: recipeDescription,
            cookTime: preparationTime,
            ingredientsRecipe: ingredients,
            cookType: selectedType,
            status: roleCheck,
          };

          cookPhoto.append('data', JSON.stringify(payload));

          await createUpload(cookPhoto, id);
          setShowButton(true);

        } else {
          const payload: ICreateRecipe = {
            authorId: id,
            authorName: fullName,
            cookName: recipeName,
            cookPhoto: photoLink,
            cookInfo: recipeDescription,
            cookTime: preparationTime,
            ingredientsRecipe: ingredients,
            cookType: selectedType,
            status: roleCheck,
          };

          await createRecipe(payload, id);
          setShowButton(true);
        };
      } catch (error: any) {
        console.error("Erro:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!logged) {
      navigate('/registro');
    }
  }, [navigate, logged]);

  return (
    <div className="recipe-container">
      {showButton && (
        <ConfirmRedirect
          message="Agora só aguardar a aprovação da receita!"
          redirectUrl="/home"
        />
      )}
      <form className="recipe_form" onSubmit={handleSubmit}>
        <label htmlFor="recipe-name">
          <h4>Nome da receita</h4>
          <input
            className="recipe_input"
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
              className="recipe_input"
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
            className="recipe_input"
            type="file"
            id="cookPhoto"
            name="cookPhoto"
            onChange={handleFileChange}
            disabled={showButton}
          />
          <p>OU</p>
          <input
            className="recipe_input"
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
                {ingredientEditMode[index] ? (
                  <input
                    className="recipe_input"
                    type="text"
                    value={ingredient}
                    maxLength={50}
                    onChange={(event) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index] = event.target.value;
                      setIngredients(updatedIngredients);
                    }}
                    readOnly={showButton}
                  />
                ) : (
                  <span className="ingredient-text">{ingredient}</span>
                )}
                {!showButton && (
                  <button
                    type="button"
                    className="recipe_remove_button"
                    onClick={() => handleRemoveIngredient(index)}
                    disabled={showButton}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            {!showButton && ingredients.length < 15 && (
              <div>
                <input
                  className="recipe_input"
                  type="text"
                  value={ingredientInput}
                  maxLength={50}
                  onChange={(event) => setIngredientInput(event.target.value)}
                  disabled={showButton}
                />
                <button
                  type="button"
                  className="recipe_add_button"
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
              className="recipe_input"
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
          <button type="submit"
            className="btn-visu btn_accept"
            disabled={!isFormValid}
          >
            Criar
          </button>
        )}
        {!isFormValid && (
          <div
            aria-label="Preencha todos os campos."
            data-balloon="Preencha todos os campos."
            data-balloon-pos="right"
            data-balloon-visible="true"
            className="tooltip_balloon_recipe"
          >
          </div>
        )}
      </form>
    </div>
  );
};

export default Recipe;
