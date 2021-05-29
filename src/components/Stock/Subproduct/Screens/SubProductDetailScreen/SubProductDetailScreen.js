import React from 'react';

import Container from '@material-ui/core/Container';
import DetailBody from './DetailBody';
import DetailHeading from './DetailHeading';


function ProductDetailScreen(props) {
    const product = props.product;
    const deleteFunction = props.deleteFunction;

    return (
        <Container maxWidth='md' className='container'>
            <DetailHeading product={product} deleteFunction={deleteFunction} />
            <DetailBody product={product} />
        </Container>
    )
}

export default ProductDetailScreen;
