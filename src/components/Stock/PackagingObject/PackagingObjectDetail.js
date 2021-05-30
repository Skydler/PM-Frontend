import React from 'react'
import {getPackagingObjectWithId, deletePackagingObject} from 'services/products'
import ItemDetail from '../Common/ItemDetail'

function PackagingObjectDetail() {
    const pathname = "/packaging"

    return <ItemDetail pathname={pathname}
        getter={getPackagingObjectWithId}
        deletter={deletePackagingObject} />
}

export default PackagingObjectDetail

