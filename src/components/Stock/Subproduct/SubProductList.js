import React, { useState, useEffect } from 'react'

import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { getSubproducts } from 'services/currentUser'

import SubproductDetail from './SubproductDetail';
import SubproductCreate from './SubproductCreate';
import ProductTableScreen from '../Screens/ProductTable/ProductTable'
import ProductRow from '../Screens/ProductTable/ProductRow'


function SubproductList(props) {
    const [rows, setRows] = useState();
    const { path } = useRouteMatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/home/subproducts') {
            getSubproducts().then(subproducts => {
                const prod_rows = subproducts.map(prod =>
                    <ProductRow key={prod.id} product={prod} />
                );
                setRows(prod_rows);
            })
        }
    }, [location])

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Subproducts' />} />
            <Route path={`${path}/create`} component={SubproductCreate} />
            <Route path={`${path}/:productID`} component={SubproductDetail} />
        </Switch>
    );
}

export default SubproductList
