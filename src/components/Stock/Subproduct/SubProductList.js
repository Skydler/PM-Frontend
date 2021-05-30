import React from 'react'

import {getSubproducts} from 'services/currentUser'

import ItemList from '../Common/ItemList'
import SubproductCreate from './SubproductCreate'
import SubproductDetail from './SubproductDetail'


function SubproductList() {
    const pathname = '/subproducts'
    const title = "Subproducts"

    return <ItemList getter={getSubproducts}
        pathname={pathname}
        title={title}
        createComp={SubproductCreate}
        detailComp={SubproductDetail} />;
}

export default SubproductList
