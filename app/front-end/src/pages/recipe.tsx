import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ICreateRecipe from "../interface/ICreateRecipe";
import { requestCreateRecipe, requestCreateRecipeUpload } from "../services/requests";
import '../styles/pages/recipe.css';

const Recipe = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoLink, setPhotoLink] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [selectedType, setSelectedType] = useState('');
  const [showButton, setShowButton] = useState<boolean>(false);

  const isFormValid = !!(recipeName && (selectedFile || photoLink) && ingredients.length && recipeDescription && preparationTime);

  const navigate = useNavigate();

  const handleRecipeNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRecipeName(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

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

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(event.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredients.length < 15) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleRecipeDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    setRecipeDescription(description);
  };

  const handlePreparationTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    const parsedTime = parseInt(inputTime, 10);

    if (!isNaN(parsedTime) && parsedTime >= 0) {
      setPreparationTime(parsedTime);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();

    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    let roleCheck: string = 'pending';
    if (role === 'admin') {
      roleCheck = 'approved'
    }

    try {
      if (selectedFile !== null) {
        const cookPhoto = new FormData();
        cookPhoto.append('cookPhoto', selectedFile);

        const payload: ICreateRecipe = {
          cookAuthor: username,
          cookName: recipeName,
          cookPhoto: null,
          cookInfo: recipeDescription,
          cookTime: preparationTime,
          ingredientsRecipe: ingredients,
          cookType: selectedType,
          status: roleCheck,
        };

        cookPhoto.append('data', JSON.stringify(payload));

        await requestCreateRecipeUpload('/recipe/create-recipe/upload', cookPhoto);
        setShowButton(true);

      } else {
        const payload: ICreateRecipe = {
          cookAuthor: username,
          cookName: recipeName,
          cookPhoto: photoLink,
          cookInfo: recipeDescription,
          cookTime: preparationTime,
          ingredientsRecipe: ingredients,
          cookType: selectedType,
          status: roleCheck,
        };

        await requestCreateRecipe('/recipe/create-recipe', payload);
        setShowButton(true);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('LoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="recipe-container">
      <form className="recipe-form">
        <label htmlFor="recipe-name">
          <h4>Nome da receita</h4>
          <input
            type="text"
            id="recipe-name"
            maxLength={40}
            value={recipeName}
            onChange={handleRecipeNameChange}
            readOnly={showButton}
          />
        </label>
        <div>
          <label htmlFor="recipe-type">
            <h4>Tipo de Receita</h4>
            <select id="recipe-type" value={selectedType} onChange={handleTypeChange} disabled={showButton}>
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
          <label htmlFor="cookPhoto">
            <h4>Foto da receita</h4>
            <input
              type="file"
              id="cookPhoto"
              name="cookPhoto"
              onChange={handleFileChange}
              disabled={showButton}
            />
            <p>OU</p>
            <input
              type="text"
              id="cookPhoto"
              placeholder="Insira o link da foto"
              value={photoLink}
              onChange={handleLinkChange}
              readOnly={showButton}
            />
          </label>
          {selectedFile && <p>Nome do arquivo: {selectedFile.name}</p>}
        </div>
        <div>
          <label htmlFor="recipe-ingredient">
            <h4>Informe os ingredientes da receita</h4>
            <h4>Ingrediente e quantidade</h4>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
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
            {!showButton && (
              <div>
                <input
                  type="text"
                  value={ingredientInput}
                  maxLength={50}
                  onChange={handleIngredientChange}
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
            maxLength={10000}
            onChange={handleRecipeDescriptionChange}
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
          <button onClick={handleSubmit} type="submit" disabled={!isFormValid}>
            Criar
          </button>
        )}
        {showButton && (
          <div className="centered-button">
            <Link to="/" className="home-button">Agora só aguardar a aprovação da receita!</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Recipe;
