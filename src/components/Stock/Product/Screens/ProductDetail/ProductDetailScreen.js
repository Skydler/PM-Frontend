import React from 'react';

import Container from '@material-ui/core/Container';
import DetailBody from './DetailBody';
import DetailHeading from './DetailHeading';
import DetailExtra from './DetailExtra';


function ProductDetailScreen(props) {
    const product = props.product

    return (
        <Container maxWidth='md' id='container'>
            <DetailHeading product={product} />
            <DetailBody product={product} />
            <DetailExtra product={product} />
        </Container>
    )
}

export default ProductDetailScreen;
