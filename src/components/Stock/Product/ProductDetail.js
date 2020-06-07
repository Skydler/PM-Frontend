import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';

import { getProductWithId } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from './Screens/ProductDetail/ProductDetailScreen'


function ProductDetail(props) {
    const [error, setError] = useState(false);
    const [product, setProduct] = useState();

    const { state } = props.location;
    let { productID } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await getProductWithId(productID)
                setProduct(response.data)
            } catch (error) {
                setError(true)
            }
        }
        if (!product) {
            if (state) {
                setProduct(state);
            } else {
                fetchProduct();
            }
        }
    }, [product, productID, state])

    if (error) {
        return <NotFound reason="Couldn't find the product you searched for. Sorry :(" />
    }
    return !product ? 'Loading...' : (<ProductDetailScreen product={product} />)
}

export default ProductDetail
