interface IRecipe {
  authorId: number;
  authorName: string | null;
  cookName: string;
  cookPhoto: string | FormData | Express.Multer.File;
  cookInfo: string;
  cookTime: number;
  ingredientsRecipe: string[];
  cookType: string;
  status: string;
}

export default IRecipe;
