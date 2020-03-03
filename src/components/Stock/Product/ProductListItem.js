import React from 'react'

import ListItem from '@material-ui/core/ListItem';

import { Link as RouterLink, useRouteMatch } from 'react-router-dom'


function ProductListItem(props) {
    let { url } = useRouteMatch()
    const { product } = props

    return (
        <ListItem
            button={true}
            divider={true}
            component={RouterLink}
            to={{
                pathname: `${url}/${product.id}`,
                state: product,
            }}
        >
            {product.name} - {product.current_amount}
        </ListItem >
    )
}

export default ProductListItem
