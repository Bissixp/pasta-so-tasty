interface IRecipe {
  cookAuthor: String;
  cookName: String;
  cookPhoto: string | Buffer | null;
  cookInfo: String;
  cookTime: Number;
  ingredientsRecipe: string[];
}

export default IRecipe;
