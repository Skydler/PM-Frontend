import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { createSubproduct } from 'services/products'
import { useHistory } from 'react-router-dom';

function SubproductCreate(props) {
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();

    function postSubproduct(event) {
        event.preventDefault();
        const body = {
            name: name,
            description: description,
            current_amount: amount,
            price: price,
        }

        createSubproduct(body).then(response => {
            history.push("/home/subproducts")
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
                    <TextField
                        required
                        error={isError}
                        label='Price: '
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={postSubproduct}
                    >
                        Create
                  </Button>
                </form >
            </div>
        </Container>
    )
}

export default SubproductCreate
