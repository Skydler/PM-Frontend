import React from 'react'

import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { TableCell } from '@material-ui/core';

import './ProductRow.css'


function ProductRow(props) {
    let { url } = useRouteMatch()
    const { product } = props

    return (
        <TableRow>
            <TableCell className='pink-cell' align='center'>
                <Link
                    color='inherit'
                    underline='none'
                    component={RouterLink}
                    to={`${url}/${product.id}`}
                >
                    <div>
                        {product.name}
                    </div>
                </Link >
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
