import axios from 'axios';
import ICreateRecipe from '../interface/ICreateRecipe';
import IRecipe from '../interface/IRecipe';

const apiPort = '3001';
const api = axios.create({
  baseURL: `http://localhost:${apiPort}`,
});

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint: string, body: any) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegistration = async (endpoint: string, body: any) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestCreateRecipe = async (endpoint: string, body: ICreateRecipe) => {
  await api.post(endpoint, body);
}

export const requestCreateRecipeUpload = async (endpoint: string, body: FormData) => {
  await api.post(endpoint, body);
};

export const requestGetAllRecipes = async (endpoint: string): Promise<IRecipe[]> => {
  const { data } = await api.get(endpoint);
  return data.data;
};

export default api;