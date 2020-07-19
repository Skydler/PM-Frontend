import React from 'react';

import Container from '@material-ui/core/Container';
import DetailBody from './DetailBody';
import DetailHeading from './DetailHeading';


function ProductDetailScreen(props) {
    const product = props.product
    const ExtraDetail = props.extraDetail
    const deleteFunction = props.deleteFunction

    return (
        <Container maxWidth='md' id='container'>
            <DetailHeading product={product} deleteFunction={deleteFunction} />
            <DetailBody product={product} />
            {ExtraDetail ? <ExtraDetail product={product} /> : null}
        </Container>
    )
}

export default ProductDetailScreen;
