import React from 'react';

import Container from '@material-ui/core/Container';
import DetailBody from './DetailBody';
import DetailHeading from './DetailHeading';
import DetailExtra from './DetailExtra';


function ProductDetailScreen(props) {
    const product = props.product;
    const deleteFunction = props.deleteFunction;
    const refreshFunction = props.refreshFunction;

    return (
        <Container maxWidth='md' className='container'>
            <DetailHeading product={product} deleteFunction={deleteFunction} />
            <DetailBody product={product} />
            <DetailExtra product={product} refreshFunction={refreshFunction} />
        </Container>
    )
}

export default ProductDetailScreen;
