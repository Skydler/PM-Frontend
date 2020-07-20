import React, { useState, useEffect } from 'react'

import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { getProducts } from 'services/currentUser'

import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';
import ProductTableScreen from '../Screens/ProductTable/ProductTable'
import ProductRow from '../Screens/ProductTable/ProductRow'


function ProductList(props) {
    const [rows, setRows] = useState();
    const { path } = useRouteMatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/home/products') {
            getProducts().then(products => {
                const prod_rows = products.map(prod =>
                    <ProductRow key={prod.id} product={prod} />
                );
                setRows(prod_rows);
            })
        }
    }, [location])

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Products' />} />
            <Route path={`${path}/create`} component={ProductCreate} />
            <Route path={`${path}/:productID`} component={ProductDetail} />
        </Switch>
    );
}

export default ProductList
