import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import RulesPage from './pages/RulesPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './components/layouts/MainLayout';


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
                    <Redirect to="/profile" />
                </Switch>
            </MainLayout>
        );
    }
    return (
        <Switch>
            <Route path="/" exact>
                <div>иди логинься</div>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}