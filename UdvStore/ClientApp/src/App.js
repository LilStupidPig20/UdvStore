import React, { useState, useEffect, useContext } from 'react';
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
  const [coinsAmount, setCoinsAmount] = useState('-1');

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`https://localhost:5001/coins/get?employeeId=${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(money => {
          setCoinsAmount(String(money));
        })
        .catch((e) => logout());
    }
  }, [isAuthenticated, token, userId])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, fullName, isAuthenticated }}>
      <ButtonStatesContext.Provider value={{ isActive, toggleActive }}>
        <CoinsContext.Provider value={{ coinsAmount }}>
          <BrowserRouter>
            {routes}
          </BrowserRouter>
        </CoinsContext.Provider>
      </ButtonStatesContext.Provider>
    </AuthContext.Provider>
  );
}
