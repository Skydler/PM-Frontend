import React from 'react';
import {getProducts} from 'services/currentUser';
import ItemList from '../Common/ItemList'

import ProductCreate from './ProductCreate'
import ProductDetail from './ProductDetail'


function ProductList() {
    const pathname = '/products'
    const title = "Products"

    return <ItemList getter={getProducts}
        pathname={pathname}
        title={title}
        createComp={ProductCreate}
        detailComp={ProductDetail}
    />;
}

export default ProductList
