import React, { useState } from 'react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getSubProducts } from 'services/currentUser'

import SubproductDetail from './SubproductDetail';
import SubproductCreate from './SubproductCreate';
import ProductTableScreen from '../Screens/ProductTable/ProductTable'
import ProductRow from '../Screens/ProductTable/ProductRow'


function SubproductList(props) {
    const [rows, setRows] = useState()
    const { path } = useRouteMatch()

    function fetchSubProducts() {
        getSubProducts().then(subproducts => {
            const subprod_rows = renderProducts(subproducts)
            setRows(subprod_rows)
        })
    }

    function renderProducts(products) {
        const prod_rows = products.map((prod) =>
            <ProductRow key={prod.id} product={prod} />
        );
        return prod_rows
    }

    if (!rows) {
        fetchSubProducts();
    }

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Subproducts' />} />
            <Route path={`${path}/create`} component={SubproductCreate} />
            <Route path={`${path}/:productID`} component={SubproductDetail} />
        </Switch>
    );
}

export default SubproductList
