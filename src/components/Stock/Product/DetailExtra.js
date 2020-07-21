import React, { useState, useEffect } from 'react'
import axios from 'services/index'
import { getCompositionsOfProduct, createComposition, deleteComposition } from 'services/products'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getSubproducts } from 'services/currentUser';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './DetailExtra.css'

function DetailExtra(props) {
    const product = props.product;
    const refreshProduct = props.refreshFunction;
    const [stock, setStock] = useState({
        compositions: [],
        subproducts: [],
    });
    const [form, setForm] = useState({
        subproduct: '',
        product: product.url,
        quantity: '',
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCompositionsOfProduct(product).then(compositions => {
            getSubproducts().then(subproducts => {
                const currentSubproducts = compositions.map(comp => comp.subproduct);
                const filtered_subproducts = subproducts.filter(subp => !currentSubproducts.includes(subp.url));
                setStock({
                    compositions: compositions,
                    subproducts: filtered_subproducts,
                });
            });
        })
    }, [product])

    function renderIngredients() {
        const items = stock.compositions.map(comp =>
            <SubProductListItem composition={comp} refreshFunction={refreshProduct} />
        );
        return items
    }

    function renderFilteredSubproducts() {
        const items = stock.subproducts.map(subp =>
            <MenuItem value={subp.url}>{subp.name} </MenuItem>
        );
        return items
    }

    function handleAddSubproduct(event) {
        createComposition(form);
        refreshProduct();
        setOpen(false);
    }

    function updateForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <List>
                <ListItem>Makeable amount: {product.makeable_amount}</ListItem>
            </List>

            <List subheader={
                <ListSubheader component="div">Ingredients:
                    <IconButton edge='end' onClick={() => setOpen(true)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </ListSubheader>} >
                {renderIngredients()}
            </List>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add a new ingredient</DialogTitle>
                <DialogContent >
                    <FormControl>
                        <Select
                            name='subproduct'
                            onChange={updateForm}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {renderFilteredSubproducts()}
                        </Select>
                        <Input
                            name="quantity"
                            onChange={updateForm}
                            placeholder="Quantity">
                        </Input>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSubproduct} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}

function SubProductListItem(props) {
    const [subproduct, setSubproduct] = useState('');
    const comp = props.composition;
    const refreshProduct = props.refreshFunction;

    useEffect(() => {
        axios.get(comp.subproduct).then(response =>
            setSubproduct(response.data)
        )
    }, [comp.subproduct])

    function handleDelete() {
        deleteComposition(comp.id).then(() => refreshProduct());
    }

    return (
        <ListItem key={comp.id} >{`${subproduct.name}: ${comp.quantity}`}
            <IconButton edge='end' onClick={handleDelete}>
                <HighlightOffIcon fontSize='small' />
            </IconButton>
        </ListItem>
    )
}

export default DetailExtra
