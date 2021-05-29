import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {getSubProductWithId, deleteSubproduct} from 'services/products'
import NotFound from 'components/Maintenance/NotFound'
import ProductDetailScreen from '../Screens/ProductDetail/ProductDetailScreen'
import CircularProgress from '@material-ui/core/CircularProgress';

function SubproductDetail() {
    const [subproduct, setSubProduct] = useState();
    const [error, setError] = useState(false);

    let {productID} = useParams();
    const history = useHistory();

    useEffect(() => {
        getSubProductWithId(productID)
            .then(response => setSubProduct(response.data))
            .catch(error => {
                setError(true);
                throw error;
            })
    }, [productID])

    if (error) {
        return <NotFound reason="Couldn't find the subproduct you searched for. Sorry :(" />
    }

    function handleDelete(id) {
        deleteSubproduct(id).then(() => {
            history.push("/subproducts")
        })
    }

    return !subproduct ?
        <CircularProgress />
        :
        <ProductDetailScreen
            product={subproduct}
            deleteFunction={handleDelete}
        />
}

export default SubproductDetail
