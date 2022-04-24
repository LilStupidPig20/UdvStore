import React, { useState, useEffect } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import { ButtonStatesContext } from './context/ButtonStatesContext';
import { CoinsContext } from './context/CoinsContext';
import { useStatus } from './hooks/status.hook';
import './fonts/hero.css'

export const App = () => {
  const { login, logout, token, userId, fullName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  let { isActive, toggleActive } = useStatus();
  const [coinsAmount, setCoinsAmount] = useState();

  useEffect(() => {
      fetch(`https://localhost:5001/UserCoins/GetUserCoins?employeeId=${userId}`)
          .then(res => res.json())
          .then(money => {
              setCoinsAmount(money);
          });
  })

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, fullName, isAuthenticated }}>
      <ButtonStatesContext.Provider value={{ isActive, toggleActive }}>
        <CoinsContext.Provider value={{coinsAmount}}>
          <BrowserRouter>
            {routes}
          </BrowserRouter>
        </CoinsContext.Provider>
      </ButtonStatesContext.Provider>
    </AuthContext.Provider>
  );
}
