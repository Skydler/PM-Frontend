import React, {useEffect, useState, useContext} from 'react';
import {Route, Switch, useLocation, useRouteMatch} from 'react-router-dom';
import {getProducts} from 'services/currentUser';
import ProductRow from '../Screens/ProductTable/ProductRow';
import ProductTableScreen from '../Screens/ProductTable/ProductTable';
import ProductCreate from './ProductCreate';
import ProductDetail from './ProductDetail';
import {UserContext} from 'hooks/userContext'


function ProductList() {
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);
    const {path} = useRouteMatch();
    const location = useLocation();
    const user = useContext(UserContext);

    useEffect(() => {
        // pathname must be /products because this function is executed
        // from inside a product detail (cause of the route below)
        //
        // user must not be undefined to prevent from repeating querys
        // to get the current user
        if (location.pathname === '/products' && user !== undefined) {
            getProducts(user).then(products => {
                const prod_rows = products.map(prod =>
                    <ProductRow key={prod.id} product={prod} />
                );
                setRows(prod_rows);
                setLoading(false);
            })
        }
    }, [location, user])

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Products' loading={loading} />} />
            <Route path={`${path}/create`} component={ProductCreate} />
            <Route path={`${path}/:productID`} component={ProductDetail} />
        </Switch>
    );
}

export default ProductList
