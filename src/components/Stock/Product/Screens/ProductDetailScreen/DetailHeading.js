import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './index.css'

function DetailHeading(props) {
    const product = props.product
    const deleteFunction = props.deleteFunction

    return (
        <div className='heading-container'>
            <div className='text-heading'>
                <h1 className='product-title'>{product.name}</h1>
                <p className='product-description'>{product.description}</p>
            </div>
            <div>
                <IconButton edge='end' onClick={() => deleteFunction(product.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default DetailHeading
