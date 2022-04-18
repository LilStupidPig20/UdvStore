import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'


export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
        <Switch>
            <Route path="/profile" exact>
                <div>ты крутой</div>
            </Route>
            <Redirect to="/profile"/>
        </Switch>
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