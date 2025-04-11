import axios, { AxiosError, HttpStatusCode } from 'axios';
import { getToken, clearToken } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL da sua API NestJS
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized:
        clearToken();
        window.location.href = '/login';
        break;
      case HttpStatusCode.InternalServerError:
        console.error(error)
        break;
    }

    return Promise.reject(error);
  }
);

export default api;