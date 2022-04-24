import React, { useContext } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import { ButtonStatesContext } from './context/ButtonStatesContext';
import { useStatus } from './hooks/status.hook';

export const App = () => {
  const { login, logout, token, userId, fullName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  let {isActive, toggleActive} = useStatus();
  
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, fullName, isAuthenticated }}>
      <ButtonStatesContext.Provider value= {{isActive, toggleActive}}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </ButtonStatesContext.Provider>
    </AuthContext.Provider>
  );
}
