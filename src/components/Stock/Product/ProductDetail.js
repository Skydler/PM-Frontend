import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProductWithId } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'


function ProductDetail(props) {
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false)
            }
        }
        if (!product) {
            if (state) {
                setProduct(state);
                setLoading(false);
            } else {
                fetchProduct();
            }
        }
    }, [product, productID, state])

    if (loading) {
        return 'Loading...';
    }
    if (error) {
        return <NotFound />
    }
    return (
        <p>Hola amiguete, tu producto es {product.name}</p>
    )
}

export default ProductDetail
