import React from 'react'

import {Link as RouterLink, useRouteMatch} from 'react-router-dom'
import {TableRow, TableCell, Button} from '@material-ui/core';

import './index.css'


function ProductRow(props) {
    let {url} = useRouteMatch()
    const {product} = props

    return (
        <TableRow>
            <TableCell className='pink-cell' align='center' padding="none">
                <Button
                    size="small"
                    component={RouterLink}
                    to={`${url}/${product.id}`}
                >
                    {product.name}
                </Button >
            </TableCell>
            <TableCell align='right'>
                {product.current_amount}
            </TableCell>
            <TableCell align='right'>
                {product.price}
            </TableCell>
        </TableRow>
    )
}

export default ProductRow
