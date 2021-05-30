import React, {useEffect, useState} from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import ProductList from 'components/Stock/Product'
import SubProductList from 'components/Stock/Subproduct'
import PackagingObjectList from 'components/Stock/PackagingObject'
import HomeScreen from './HomeScreen'
import TopBar from 'components/Navigation/TopBar'
import {getUser} from 'services/currentUser'
import {UserContext} from 'hooks/userContext'

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
            <UserContext.Provider value={user}>
                <TopBar></TopBar>
                <Switch>
                    <Route exact path={path} component={HomeScreen} />
                    <Route path={`${path}products`} component={ProductList} />
                    <Route path={`${path}subproducts`} component={SubProductList} />
                    <Route path={`${path}packaging`} component={PackagingObjectList} />
                </Switch>
            </UserContext.Provider>
        </div>
    )
}

export default Home
