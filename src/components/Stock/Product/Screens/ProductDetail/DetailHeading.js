import React from 'react'
import './index.css'

function DetailHeading(props) {
    const product = props.product

    return (
        <div id='heading-container'>
            <h1 className='product-title'>{product.name}</h1>
            <p className='product-description'>{product.description}</p>
        </div>
    )

}

export default DetailHeading
