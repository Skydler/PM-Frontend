import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getProductWithId, deleteProduct } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from '../Screens/ProductDetail/ProductDetailScreen'
import DetailExtra from './DetailExtra'


function ProductDetail(props) {
    const [product, setProduct] = useState();
    const [error, setError] = useState(false);

    let { productID } = useParams();
    const history = useHistory();


    useEffect(() => {
        getProductWithId(productID)
            .then(response => setProduct(response.data))
            .catch(error => {
                setError(true);
                throw error;
            })
    }, [productID])

    if (error) {
        return <NotFound reason="Couldn't find the product you searched for. Sorry :(" />
    }

    function handleDelete(id) {
        deleteProduct(id).then(() => {
            history.push("/home/products")
        })
    }

    function refreshProduct() {
        getProductWithId(productID).then(response => setProduct(response.data));
    }

    return !product ? 'Loading...' :
        (<ProductDetailScreen
            product={product}
            deleteFunction={handleDelete}
            refreshFunction={refreshProduct}
            extraDetail={DetailExtra}
        />)
}

export default ProductDetail
