import React, {useState} from 'react'

import {useHistory} from 'react-router-dom';

import {createProduct} from 'services/products'
import ProductCreateScreen from "./Screens/ProductCreateScreen"

function ProductCreate() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        current_amount: '',
    })

    const [isError, setIsError] = useState(false);
    const history = useHistory();

    function postProduct(event) {
        event.preventDefault();
        createProduct(form).then(() => {
            history.push("/products")
        }).catch(error => {
            setIsError(true);
            throw error;
        });
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return <ProductCreateScreen isError={isError}
        form={form}
        postProduct={postProduct}
        updateForm={updateForm} />
}

export default ProductCreate
