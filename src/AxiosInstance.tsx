import axios from "axios";
import { UseAuth } from "./components/ContextApi";
import { config } from "process";
import { error } from "console";

const useAxios = () => {
  const auth = UseAuth();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && auth?.refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}auth/refresh`,
            {
              refresh_token: auth.refreshToken,
            }
          );
          const newAccessToken = response.data.access_token;

          auth.setAccessToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          auth.logout();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
