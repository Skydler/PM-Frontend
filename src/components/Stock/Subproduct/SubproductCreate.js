import React from 'react'
import {createSubproduct} from 'services/products'
import ItemCreate from '../Common/ItemCreate'

function SubproductCreate() {
    const extraFormFields = {
        price: ''
    }
    const pathname = '/subproducts'

    return <ItemCreate extraFormFields={extraFormFields}
        createItem={createSubproduct}
        pathname={pathname} />
}

export default SubproductCreate
