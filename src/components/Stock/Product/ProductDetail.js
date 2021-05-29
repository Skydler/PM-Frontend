import CircularProgress from '@material-ui/core/CircularProgress';
import NotFound from 'components/Maintenance/NotFound';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {deleteProduct, getProductWithId} from 'services/products';
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen';


function ProductDetail() {
    const [product, setProduct] = useState();
    const [error, setError] = useState(false);

    let {productID} = useParams();
    const history = useHistory();

    useEffect(() => {
        getProductWithId(productID)
            .then(response => setProduct(response.data))
            .catch(error => {
                setError(true);
                throw error;
            })
    }, [productID])

    function handleDelete(id) {
        deleteProduct(id).then(() => {
            history.push("/products")
        })
    }

    function refreshProduct() {
        getProductWithId(productID).then(response => setProduct(response.data));
    }

    if (error) {
        return <NotFound reason="Couldn't find the product you searched for. Sorry :(" />
    }

    return !product ?
        <CircularProgress />
        :
        <ProductDetailScreen
            product={product}
            deleteFunction={handleDelete}
            refreshFunction={refreshProduct}
        />
}

export default ProductDetail
