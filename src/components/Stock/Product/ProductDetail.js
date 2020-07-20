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
    const { state } = props.location;   //Product recieved from row of product table
    const history = useHistory();


    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await getProductWithId(productID)
                setProduct(response.data)
            } catch (error) {
                setError(true)
            }
        }

        if (state) {
            setProduct(state);
        } else {
            fetchProduct();
        }
    }, [productID, state])

    if (error) {
        return <NotFound reason="Couldn't find the product you searched for. Sorry :(" />
    }

    function handleDelete(id) {
        deleteProduct(id).then(() => {
            history.push("/home/products")
        })
    }

    return !product ? 'Loading...' :
        (<ProductDetailScreen
            product={product}
            deleteFunction={handleDelete}
            extraDetail={DetailExtra}
        />)
}

export default ProductDetail
