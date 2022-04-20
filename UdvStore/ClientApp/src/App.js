import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";

export const App = () => {
  const isAuthenticated = false;
  const routes = useRoutes(isAuthenticated);
  
  return (
    <AuthContext.Provider value={{}}>
      <BrowserRouter>
          {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
