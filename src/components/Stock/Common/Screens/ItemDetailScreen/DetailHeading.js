import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './index.css'

function DetailHeading(props) {
    const item = props.item
    const deleteFunction = props.deleteFunction

    return (
        <div className='heading-container'>
            <div className='text-heading'>
                <h1 className='product-title'>{item.name}</h1>
                <p className='product-description'>{item.description}</p>
            </div>
            <div>
                <IconButton edge='end' onClick={() => deleteFunction(item.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default DetailHeading
