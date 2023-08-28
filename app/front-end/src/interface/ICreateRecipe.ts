interface ICreateRecipe {
  authorId: number;
  authorName: string
  cookName: string;
  cookPhoto: string | FormData | null;
  cookInfo: string;
  cookTime: number;
  ingredientsRecipe: string[];
  cookType: string;
  status: string;
}

export default ICreateRecipe;