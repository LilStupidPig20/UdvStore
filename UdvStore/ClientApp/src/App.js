import React, { useState, useEffect } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import { ButtonStatesContext } from './context/ButtonStatesContext';
import { CoinsContext } from './context/CoinsContext';
import { useStatus } from './hooks/status.hook';
import './custom.css';

export const App = () => {
  const { login, logout, token, userId, fullName, role, position } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, role);
  let { isActive, toggleActive } = useStatus();
  const [coinsAmount, setCoinsAmount] = useState('-1');
  useEffect(() => {
    if (isAuthenticated && role === 1) {
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
        .catch(error => logout())
    }
  }, [isAuthenticated, role, token, userId, logout])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, role, fullName, isAuthenticated, position }}>
      <ButtonStatesContext.Provider value={{ isActive, toggleActive }}>
        <CoinsContext.Provider value={{ coinsAmount }}>
          <BrowserRouter>
            { routes }
          </BrowserRouter>
        </CoinsContext.Provider>
      </ButtonStatesContext.Provider>
    </AuthContext.Provider>
  );
}
