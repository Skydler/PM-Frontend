import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ProductList from 'components/Stock/Product'
import SubProductList from 'components/Stock/Subproduct'
import HomeScreen from './HomeScreen'
import TopBar from 'components/Navigation/TopBar'

function Home(props) {
    const { path } = useRouteMatch()

    return (
        <div>
            <TopBar></TopBar>
            <Switch>
                <Route exact path={path} component={HomeScreen} />
                <Route path={`${path}/products`} component={ProductList} />
                <Route path={`${path}/subproducts`} component={SubProductList} />
            </Switch>
        </div>
    )
}

export default Home
