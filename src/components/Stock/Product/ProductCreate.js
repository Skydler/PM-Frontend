import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import { createProduct } from 'services/products'

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
            history.push("/home/products")
        }).catch(error => {
            setIsError(true);
            throw error;
        });
    }

    function updateForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <Container maxWidth='md'>
            <div>
                <form>
                    <TextField
                        required
                        error={isError}
                        label='Name: '
                        name='name'
                        value={form.name}
                        onChange={updateForm}
                    />
                    <TextField
                        required
                        error={isError}
                        label='Description: '
                        name='description'
                        value={form.description}
                        onChange={updateForm}
                    />
                    <TextField
                        required
                        error={isError}
                        label='Amount: '
                        name='current_amount'
                        value={form.amount}
                        onChange={updateForm}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={postProduct}
                    >
                        Create
                  </Button>
                </form >
            </div>
        </Container>
    )
}

export default ProductCreate
