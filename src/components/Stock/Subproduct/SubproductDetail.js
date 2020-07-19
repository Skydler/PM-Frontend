import React, { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom';

import { getSubProductWithId, deleteSubproduct } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from '../Screens/ProductDetail/ProductDetailScreen'


function SubproductDetail(props) {
    const [error, setError] = useState(false);
    const [product, setProduct] = useState();
    const history = useHistory();

    const { state } = props.location;
    let { productID } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await getSubProductWithId(productID)
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
        return <NotFound reason="Couldn't find the subproduct you searched for. Sorry :(" />
    }

    function handleDelete(id) {
        deleteSubproduct(id).then(response => {
            history.push("/home/subproducts")
        })
    }

    return !product ? 'Loading...' : (<ProductDetailScreen product={product} deleteFunction={handleDelete} />)
}

export default SubproductDetail
