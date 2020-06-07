import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { createProduct } from 'services/products'

function ProductCreate(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')

    function postProduct(event) {
        event.preventDefault();
        const body = {
            name: name,
            description: description,
            current_amount: amount,
        }
        createProduct(body)
    }

    return (
        <Container maxWidth='md'>
            <div>
              <form>
                  <TextField
                      required
                      label='Name: '
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                      required
                      label='Description: '
                      name='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                      required
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
