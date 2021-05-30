import React from 'react';
import {deleteProduct, getProductWithId} from 'services/products';
import ItemDetail from '../Common/ItemDetail'
import DetailExtra from './DetailExtra'

function ProductDetail() {
    const pathname = "/products"

    return <ItemDetail pathname={pathname}
        getter={getProductWithId}
        deletter={deleteProduct}
        DetailExtra={DetailExtra} />
}

export default ProductDetail
