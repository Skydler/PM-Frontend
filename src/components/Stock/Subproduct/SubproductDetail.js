import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getSubProductWithId, deleteSubproduct } from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from '../Screens/ProductDetail/ProductDetailScreen'

function SubproductDetail(props) {
    const [product, setProduct] = useState();
    const [error, setError] = useState(false);

    let { productID } = useParams();
    const { state } = props.location;   //Product recieved from row of product table
    const history = useHistory();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await getSubProductWithId(productID)
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
