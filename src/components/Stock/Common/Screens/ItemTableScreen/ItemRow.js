import React from 'react'

import {Link as RouterLink, useRouteMatch} from 'react-router-dom'
import {TableRow, TableCell, Button} from '@material-ui/core';

import './index.css'


function ItemRow(props) {
    let {url} = useRouteMatch()
    const {item} = props

    return (
        <TableRow>
            <TableCell className='pink-cell' align='center' padding="none">
                <Button
                    size="small"
                    component={RouterLink}
                    to={`${url}/${item.id}`}
                >
                    {item.name}
                </Button >
            </TableCell>
            <TableCell align='right'>
                {item.current_amount}
            </TableCell>
            <TableCell align='right'>
                {item.price || item.cost}
            </TableCell>
        </TableRow>
    )
}

export default ItemRow

