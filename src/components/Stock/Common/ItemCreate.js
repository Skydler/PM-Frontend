import React, {useState} from 'react'

import {useHistory} from 'react-router-dom';
import ItemCreateScreen from "./Screens/ItemCreateScreen"

function ItemCreate(props) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        current_amount: '',
        ...props.extraFormFields
    });
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const createItem = props.createItem;
    const pathname = props.pathname;

    function postItem(event) {
        event.preventDefault();
        createItem(form).then(() => {
            history.push(pathname)
        }).catch(error => {
            setIsError(true);
            throw error;
        });
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return <ItemCreateScreen isError={isError}
        form={form}
        postItem={postItem}
        updateForm={updateForm}
    />
}

export default ItemCreate

