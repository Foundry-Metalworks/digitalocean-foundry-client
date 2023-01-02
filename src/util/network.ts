import axios, { AxiosResponse } from 'axios';

const URL = import.meta.env.VITE_AUTH_AUDIENCE;

export const get = async (path: string, token: string): Promise<AxiosResponse> => {
  return await axios.get(`${URL}/api/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const post = async (path: string, token: string, data?: unknown): Promise<AxiosResponse> => {
  return await axios.post(`${URL}/api/${path}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  get,
  post
};
