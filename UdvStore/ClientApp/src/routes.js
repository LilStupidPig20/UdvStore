import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import RulesPage from './pages/RulesPage';
import ProfilePage from './pages/ProfilePage';
import StorePage from './pages/StorePage';
import MainLayout from './components/layouts/MainLayout';
import NonAuthLayout from './components/layouts/NonAuthLayout';
import { AuthPage } from './pages/AuthPage';


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/profile" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/rules" >
                        <RulesPage />
                    </Route>
                    <Route path="/store" >
                        <StorePage />
                    </Route>
                    <Redirect to="/profile" />
                </Switch>
            </MainLayout>
        );
    }
    return (
        <NonAuthLayout>
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Route path="/rules" >
                    <RulesPage />
                </Route>
                <Route path="/store" >
                    <StorePage />
                </Route>
                <Redirect to="/" />
            </Switch>
        </NonAuthLayout>

    )
}