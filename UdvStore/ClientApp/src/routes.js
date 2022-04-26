import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import RulesPage from './pages/RulesPage';
import ProfilePage from './pages/ProfilePage';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import MainLayout from './components/layouts/MainLayout';
import NonAuthLayout from './components/layouts/NonAuthLayout';
import { AuthPage } from './pages/AuthPage';
import { SendFormPage } from './pages/SendFormPage';


export const useRoutes = (isAuthenticated) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5001/store/getAll')
            .then(res => res.json())
            .then(items => setProducts(items))
    }, []);
    
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
                        <StorePage products={products} />
                    </Route>
                    {
                        products.map(product => {
                            return <Route path={`/product/${product.id}`} >
                                <ProductPage product={product}/>
                            </Route>
                        })
                    }
                    <Route path="/sendForm">
                        <SendFormPage />
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
                    <StorePage  products={products} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </NonAuthLayout>

    )
}