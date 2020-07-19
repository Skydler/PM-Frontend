import React, { useState } from 'react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getProducts } from 'services/currentUser'

import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';
import ProductTableScreen from '../Screens/ProductTable/ProductTable'
import ProductRow from '../Screens/ProductTable/ProductRow'


function ProductList(props) {
    const [rows, setRows] = useState()
    const { path } = useRouteMatch()

    function fetchProducts() {
        getProducts().then(products => {
            const prod_rows = renderProducts(products)
            setRows(prod_rows)
        })
    }

    function renderProducts(products) {
        const prod_rows = products.map((prod) =>
            <ProductRow key={prod.id} product={prod} />
        );
        return prod_rows
    }

    if (!rows) {
        fetchProducts();
    }

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Products' />} />
            <Route path={`${path}/create`} component={ProductCreate} />
            <Route path={`${path}/:productID`} component={ProductDetail} />
        </Switch>
    );
}

export default ProductList
