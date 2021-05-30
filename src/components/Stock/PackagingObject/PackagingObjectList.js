import React from 'react'

import {getPackagingObjects} from 'services/currentUser'

import ItemList from '../Common/ItemList'
import PackagingObjectCreate from './PackagingObjectCreate';
import PackagingObjectDetail from './PackagingObjectDetail';


function SubproductList() {
    const pathname = '/packaging'
    const title = "Packaging Objects"

    return <ItemList getter={getPackagingObjects}
        pathname={pathname}
        title={title}
        createComp={PackagingObjectCreate}
        detailComp={PackagingObjectDetail} />;
}

export default SubproductList

