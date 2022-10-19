import axios, { AxiosInstance } from 'axios';
import { ApiDefault } from './api.enums';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ApiDefault.baseURL,
  params: {
    api_key: ApiDefault.key,
    format: ApiDefault.format,
    nojsoncallback: 1,
  },
});

export default axiosInstance;
