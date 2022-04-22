import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NonAuthLayout from './components/layouts/NonAuthLayout';
import { AuthPage } from './pages/AuthPage';


export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
        <Switch>
            <Route path="/profile" exact>
                <div>ты круууут</div>
            </Route>
            <Redirect to="/profile"/>
        </Switch>
        );
    }
    return (
        <NonAuthLayout>
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        </NonAuthLayout>
        
    )
}