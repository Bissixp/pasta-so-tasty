import axios from 'axios';

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

export default api;