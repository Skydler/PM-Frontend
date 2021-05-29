import React, {useEffect, useState, useContext} from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControl,
    IconButton, Input, List, ListItem,
    ListSubheader, MenuItem, Select
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {getSubproducts} from 'services/currentUser';
import {createComposition, deleteComposition, getCompositionsOfProduct} from 'services/products';
import {UserContext} from 'hooks/userContext';
import './index.css';


function DetailExtra(props) {
    const product = props.product;
    const refreshProduct = props.refreshFunction;
    const [stock, setStock] = useState({
        compositions: [],
        usedSubproducts: [],
        notUsedSubproducts: [],
    });
    const [form, setForm] = useState({
        product: product.url,
        subproduct: '',
        quantity: '',
    });
    const [open, setOpen] = useState(false);
    const user = useContext(UserContext);

    useEffect(() => {
        // All of this filtering should be done by the backend
        // but for now let's leave it this way so I can get a simple prototype working
        getCompositionsOfProduct(product).then(compositions => {
            getSubproducts(user).then(totalSubproducts => {
                const CompSubproductUrls = compositions.map(comp => comp.subproduct);
                const notUsedSubproducts = totalSubproducts.filter(subp => !CompSubproductUrls.includes(subp.url));
                const usedSubproducts = totalSubproducts.filter(subp => CompSubproductUrls.includes(subp.url));
                setStock({
                    compositions: compositions,
                    usedSubproducts: usedSubproducts,
                    notUsedSubproducts: notUsedSubproducts,
                });
            });
        })
    }, [product, user])

    function renderIngredients() {
        const items = stock.usedSubproducts.map(subp => {
            const prodComposition = stock.compositions.filter(comp => comp.subproduct === subp.url)[0];
            return <SubProductListItem key={subp.id} value={subp} composition={prodComposition} refreshFunction={refreshProduct} />
        });
        return items
    }

    function renderFilteredSubproducts() {
        const items = stock.notUsedSubproducts.map(subp =>
            <MenuItem key={subp.id} value={subp.url}>{subp.name} </MenuItem>
        );
        return items
    }

    function handleAddSubproduct() {
        createComposition(form);
        setOpen(false);
        refreshProduct();
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value});
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
                    <Button onClick={handleAddSubproduct} color="primary"> Add </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

function SubProductListItem(props) {
    const subprod = props.value;
    const comp = props.composition;
    const refreshProduct = props.refreshFunction;

    function handleDelete() {
        deleteComposition(comp.id).then(() => refreshProduct());
    }

    return (
        <ListItem>{`${subprod.name}: ${comp.quantity}`}
            <IconButton edge='end' onClick={handleDelete}>
                <HighlightOffIcon fontSize='small' />
            </IconButton>
        </ListItem>
    )
}

export default DetailExtra
