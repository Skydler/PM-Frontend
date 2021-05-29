import React, {useState} from 'react'

import {createSubproduct} from 'services/products'
import {useHistory} from 'react-router-dom';
import SubProductCreateScreen from "./Screens/SubProductCreateScreen"

function SubproductCreate() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        current_amount: '',
        price: '',
    });
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    function postSubproduct(event) {
        event.preventDefault();
        createSubproduct(form).then(() => {
            history.push("/subproducts")
        }).catch(error => {
            setIsError(true);
            throw error;
        });
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return <SubProductCreateScreen isError={isError}
        form={form}
        postSubProduct={postSubproduct}
        updateForm={updateForm} />
}

export default SubproductCreate
