import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getSubProductWithId, deleteSubproduct } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from '../Screens/ProductDetail/ProductDetailScreen'

function SubproductDetail(props) {
    const [product, setProduct] = useState();
    const [error, setError] = useState(false);

    let { productID } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSubProductWithId(productID)
            .then(response => setProduct(response.data))
            .catch(error => {
                setError(true);
                throw error;
            })
    }, [productID])

    if (error) {
        return <NotFound reason="Couldn't find the subproduct you searched for. Sorry :(" />
    }

    function handleDelete(id) {
        deleteSubproduct(id).then(response => {
            history.push("/home/subproducts")
        })
    }

    return !product ? 'Loading...' :
        (<ProductDetailScreen
            product={product}
            deleteFunction={handleDelete}
        />)
}

export default SubproductDetail
