import React from 'react'
import {TextField, Button, Container} from '@material-ui/core'


function ItemCreateScreen(props) {
    const form = props.form;
    const isError = props.isError;
    const postItem = props.postItem;
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
                    {"price" in form &&
                        <TextField
                            required
                            error={isError}
                            label='Price: '
                            name='price'
                            value={form.price}
                            onChange={updateForm}
                        />
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={postItem}
                    >
                        Create
                  </Button>
                </form >
            </div>
        </Container>
    )
}

export default ItemCreateScreen;

