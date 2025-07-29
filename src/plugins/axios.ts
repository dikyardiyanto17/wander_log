import axios from 'axios'
import type { ErrorApiResponse } from './types'

const api = axios.create({
  baseURL: 'https://extra-brooke-yeremiadio-46b2183e.koyeb.app',
  withCredentials: true,
})

const noAuthPaths = ['/api/auth/local/register', '/api/auth/local']

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    const err: ErrorApiResponse = {
      status: error?.response?.data?.error?.status ?? 500,
      name: error?.response?.data?.error?.name ?? "UnknownError",
      message: error?.response?.data?.error?.message ?? "An unexpected error occurred.",
      details: error?.response?.data?.error?.details ?? {},
    };

    return Promise.reject(err);
  }
);


export default api
