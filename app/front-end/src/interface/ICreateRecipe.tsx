interface ICreateRecipe {
  cookAuthor: string | null;
  cookName: string;
  cookPhoto: string | FormData | null;
  cookInfo: string;
  cookTime: number;
  ingredientsRecipe: string[];
  cookType: string;
  status: string;
}

export default ICreateRecipe;
