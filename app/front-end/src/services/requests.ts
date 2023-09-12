import axios from 'axios';
import ICreateRecipe from '../interface/ICreateRecipe';
import IRecipe from '../interface/IRecipe';
import ICookies from '../interface/ICookies';
import IFav from '../interface/IFav';
import IAllFavs from '../interface/IAllFavs';
import IIngredients from '../interface/IIngredients';
import IRegister from '../interface/IRegister';

const apiPort = '3001';
const api = axios.create({
  baseURL: `http://localhost:${apiPort}`,
});

// GET Requests
export const fetchAllRecipes = async (): Promise<IRecipe[]> => {
  const { data } = await api.get("/recipe/getAll");
  return data;
};

export const fetchRecipesByName = async (name: string | null): Promise<IRecipe[]> => {
  const { data } = await api.get(`recipe/getRecipesByName/${name}`);
  return data;
};

export const fetchEmail = async (email: string) => {
  const { data } = await api.get(`/login/email/${email}`, {
    withCredentials: true,
  });
  return data;
};

export const fetchFav = async ({ idUser, idRecipe }: IFav) => {
  const data = await api.get(`/recipe/favorites/${idUser}/${idRecipe}`);
  if (data) {
    return data;
  } else {
    return null;
  }
}

export const fetchRecipeIngredients = async (id: number): Promise<IIngredients> => {
  const { data } = await api.get(`/recipe/getIngredients/${id}`);
  return data;
};

export const fetchUpload = async (photo: string): Promise<string> => {
  const url = `/uploads/${photo}`;
  const response = await api.get(url, { responseType: 'blob' });
  const imageBlob = response.data;
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl;
};

export const fetchRecipesByType = async (type: string): Promise<IRecipe[]> => {
  const { data } = await api.get(`recipe/getTypeRecipes/${type}`);
  return data;
};

export const fetchRecipe = async (id: string | null, nameRecipe: string): Promise<IRecipe> => {
  const { data } = await api.get(`recipe/getRecipe/${id}-${nameRecipe}`);
  return data;
};

export const fetchMyRecipes = async (id: number | null): Promise<IRecipe[]> => {
  const { data } = await api.get(`recipe/getMyRecipe/${id}`);
  return data;
};

export const fetchMyPedingRecipes = async (id: number): Promise<IRecipe[]> => {
  const { data } = await api.get(`recipe/pending/${id}`);
  return data;
};

export const fetchAllPedingRecipes = async (): Promise<IRecipe[]> => {
  const { data } = await api.get('recipe/getAllPending');
  return data;
};

export const fetchMyFavs = async (id: number): Promise<IRecipe[]> => {
  const { data } = await api.get(`recipe/getMyFavs/${id}`);
  return data;
};

export const fetchAllFavs = async (id: number): Promise<IAllFavs> => {
  const { data } = await api.get(`/recipe/all-favorites/${id}`);
  return data;
};

export const fetchValidate = async (): Promise<boolean | ICookies> => {
  try {
    const response = await api.get("/login/validate", {
      withCredentials: true,
    });
    if (response.status !== 200) {
      return false;
    }

    const data = response.data;

    return data;

  } catch (error) {
    console.clear();
    return false;
  }
};

export const fetchLogout = async () => {
  try {
    const response = await api.get("/login/logoff", {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Logout failed.');
    }

    return true;
  } catch (error: any) {
    return error.message;
  }
};
// PUT Requests

export const approveRecipe = async (id: number) => {
  await api.patch(`recipe/approveRecipe/${id}`);
};

// POST Requests
export const fetchLogin = async (body: any) => {
  const { data } = await api.post("/login", body, {
    withCredentials: true,
  });
  return data;
};

export const createAccount = async (body: IRegister) => {
  const { data } = await api.post("/registration", body, {
    withCredentials: true,
  });
  return data;
};

export const createRecipe = async (body: ICreateRecipe) => {
  await api.post("/recipe/create-recipe", body);
}

export const createUpload = async (body: FormData) => {
  await api.post("/recipe/create-recipe/upload", body);
};

export const createFav = async (body: IFav) => {
  await api.post("/recipe/favorites", body);
}

// DELETE Requests

export const deleteRecipe = async (id: number) => {
  await api.delete(`recipe/deleteRecipe/${id}`);
};

export const deleteRecipePosted = async (id: number) => {
  await api.delete(`recipe/deleteRecipePosted/${id}`, {
    withCredentials: true,
  });
};

export default api;