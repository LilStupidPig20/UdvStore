import React from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";

export const App = () => {
  const { login, logout, token, userId, fullName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, fullName, isAuthenticated }}>
      <BrowserRouter>
          {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
