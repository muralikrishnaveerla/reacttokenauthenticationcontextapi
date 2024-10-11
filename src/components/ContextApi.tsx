import React, { createContext, useContext, useState, useEffect } from "react";
import useAxios from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | null>(null);

type Prop = {
  children: React.ReactNode;
};

type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
};

export const ContextApi = ({ children }: Prop) => {
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setUser(email);

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("user", email);
      navigate("/reacttokenauthenticationcontextapi/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/reacttokenauthenticationcontextapi/login");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, accessToken, refreshToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
