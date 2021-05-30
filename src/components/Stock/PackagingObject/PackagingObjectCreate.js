import React from 'react';
import {createPackagingObject} from 'services/products'
import ItemCreate from '../Common/ItemCreate'

function PackagingObjectCreate() {
    const extraFormFields = {
        price: ''
    }
    const pathname = '/packaging'

    return <ItemCreate extraFormFields={extraFormFields}
        createItem={createPackagingObject}
        pathname={pathname} />
}

export default PackagingObjectCreate
