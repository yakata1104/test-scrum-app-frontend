import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableAxiosRequestConfig
      | undefined;

    if (
      error.response?.status !== 401 ||
      originalRequest === undefined ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshClient.post("/auth/refresh");

      return client(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
