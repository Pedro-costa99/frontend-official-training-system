import React, { createContext, useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../Service/apiDois";

export const AuthContext = createContext();
// const jwt = require('jsonwebtoken');

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entrou, setEntrou] = useState(false);
  const [status, setStatus] = useState(200);

  useEffect(() => {
    const recoveredUSer = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (recoveredUSer && token) {
      setUser(JSON.parse(recoveredUSer));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(token.exp);

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // console.log("login auth", { email, password });
    setEntrou(true);

    try {
      const response = await createSession(email, password);
      // console.log("login teste", response.data);

      // apu criar session

      const loggedUser = response.data.user;

      // console.log(loggedUser);

      const { token } = response.data;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      // setUser({id: '123', email});
      setUser(loggedUser);
      navigate("/");
      setEntrou(false);
      setStatus(200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setStatus(400);
    }
  };

  const logout = () => {
    // console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  const contextValue = useMemo(
    () => ({
      authenticated: !!user,
      user,
      loading,
      login,
      logout,
      entrou,
      status,
    }),
    [user, loading, login, logout, entrou, status],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
