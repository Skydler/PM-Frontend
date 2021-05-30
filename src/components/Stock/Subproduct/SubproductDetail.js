import React from 'react'
import {getSubProductWithId, deleteSubproduct} from 'services/products'
import ItemDetail from '../Common/ItemDetail'

function SubproductDetail() {
    const pathname = "/subproducts"

    return <ItemDetail pathname={pathname}
        getter={getSubProductWithId}
        deletter={deleteSubproduct} />
}

export default SubproductDetail
