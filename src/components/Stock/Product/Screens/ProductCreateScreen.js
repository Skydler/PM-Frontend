import React from 'react'
import {TextField, Button, Container} from '@material-ui/core'


function ProductCreateScreen(props) {
    const form = props.form;
    const isError = props.isError;
    const postProduct = props.postProduct;
    const updateForm = props.updateForm;

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

export default ProductCreateScreen;
