import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import { createProduct } from 'services/products'

function ProductCreate(props) {
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const history = useHistory();

    function postProduct(event) {
        event.preventDefault();
        const body = {
            name: name,
            description: description,
            current_amount: amount,
        }
        createProduct(body).then(response => {
            history.push("/home/products")
        }).catch(error => {
            setIsError(true);
            throw error;
        });
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        error={isError}
                        label='Description: '
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        required
                        error={isError}
                        label='Amount: '
                        name='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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
