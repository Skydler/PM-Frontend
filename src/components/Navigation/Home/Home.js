import React, {useEffect, useState} from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import ProductList from 'components/Stock/Product'
import SubProductList from 'components/Stock/Subproduct'
import HomeScreen from './HomeScreen'
import TopBar from 'components/Navigation/TopBar'
import {getUser} from 'services/currentUser'

function Home() {
    const [user, setUser] = useState();
    const {path} = useRouteMatch()

    useEffect(() => {
        getUser().then(user => {
            setUser(user);
        });
    }, [])

    return (
        <div>
            <TopBar user={user}></TopBar>
            <Switch>
                <Route exact path={path} component={HomeScreen} />
                <Route path={`${path}/products`} render={(props) =>
                    <ProductList {...props} user={user} />
                } />
                <Route path={`${path}/subproducts`} render={(props) =>
                    <SubProductList {...props} user={user} />
                } />
            </Switch>
        </div>
    )
}

export default Home
