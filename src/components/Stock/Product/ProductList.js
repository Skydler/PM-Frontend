import React, { useState } from 'react'

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { getProducts } from 'services/currentUser'

import ProductListItem from './ProductListItem'
import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';
import './ProductList.css'
import { CssBaseline } from '@material-ui/core';

function ProductList(props) {
    const [products, setProducts] = useState()
    let { path } = useRouteMatch()

    function renderProducts(products) {
        const listItems = products.map((prod) =>
            <ProductListItem key={prod.id} product={prod} />
        );
        return listItems
    }

    function retrieveProducts() {
        getProducts().then(products => {
            const productList = renderProducts(products)
            setProducts(productList)
        })
    }

    if (!products) {
        retrieveProducts();
    }

    return (
        <Switch>
            <Route exact path={path} render={() => <ProductListScreen products={products} />} />
            <Route path={`${path}/create`} component={ProductCreate} />
            <Route path={`${path}/:productID`} component={ProductDetail} />
        </Switch>
    );
}

function ProductListScreen(props) {
    let { url } = useRouteMatch()

    return (
        <Container maxWidth='md'>
            <CssBaseline />
            <div>
                <h1 className='central-title'>Productetes</h1>
                <List>
                    {props.products}
                </List>
                <Link to={`${url}/create`}>Crear producto</Link>
            </div>
        </Container>
    )
}


export default ProductList
