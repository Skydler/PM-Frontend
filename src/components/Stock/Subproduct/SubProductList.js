import React, {useState, useEffect, useContext} from 'react'

import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'
import {getSubproducts} from 'services/currentUser'

import SubproductDetail from './SubproductDetail';
import SubproductCreate from './SubproductCreate';
import ProductTableScreen from './Screens/SubProductTableScreen/ProductTableScreen'
import ProductRow from './Screens/SubProductTableScreen/ProductRow'
import {UserContext} from 'hooks/userContext'


function SubproductList() {
    const [rows, setRows] = useState();
    const {path} = useRouteMatch();
    const location = useLocation();
    const user = useContext(UserContext);

    useEffect(() => {
        // pathname must be /products because this function is executed
        // from inside a product detail (cause of route below)
        //
        // user mustn't be undefined to prevent from repeating querys
        // to get the current user
        if (location.pathname === '/subproducts' && user !== undefined) {
            getSubproducts(user).then(subproducts => {
                const prod_rows = subproducts.map(prod =>
                    <ProductRow key={prod.id} product={prod} />
                );
                setRows(prod_rows);
            })
        }
    }, [location, user])

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductTableScreen rows={rows} title='Subproducts' />} />
            <Route path={`${path}/create`} component={SubproductCreate} />
            <Route path={`${path}/:productID`} component={SubproductDetail} />
        </Switch>
    );
}

export default SubproductList
