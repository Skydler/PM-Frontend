import React from 'react'

import {createProduct} from 'services/products'
import ItemCreate from '../Common/ItemCreate'

function ProductCreate() {
    const pathname = '/products'

    return <ItemCreate createItem={createProduct} pathname={pathname} />
}

export default ProductCreate
