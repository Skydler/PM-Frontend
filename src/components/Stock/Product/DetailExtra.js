import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import React, {useEffect, useState, useContext} from 'react';
import {getSubproducts} from 'services/currentUser';
import {createComposition, deleteComposition, getCompositionsOfProduct} from 'services/products';
import {UserContext} from 'hooks/userContext';
import './DetailExtra.css';


function DetailExtra(props) {
    const product = props.product;
    const refreshProduct = props.refreshFunction;
    const [stock, setStock] = useState({
        compositions: [],
        usedSubproducts: [],
        notUsedSubproducts: [],
    });
    const [form, setForm] = useState({
        subproduct: '',
        product: product.url,
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
            const quantity = stock.compositions.filter(comp => comp.subproduct === subp.url)[0].quantity;
            return <SubProductListItem key={subp.id} value={subp} quantity={quantity} refreshFunction={refreshProduct} />
        }
        );
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
        refreshProduct();
        setOpen(false);
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
                    <Button onClick={handleAddSubproduct} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

function SubProductListItem(props) {
    const subprod = props.value;
    const quantity = props.quantity;
    const refreshProduct = props.refreshFunction;

    function handleDelete() {
        deleteComposition(subprod.id).then(() => refreshProduct());
    }

    return (
        <ListItem>{`${subprod.name}: ${quantity}`}
            <IconButton edge='end' onClick={handleDelete}>
                <HighlightOffIcon fontSize='small' />
            </IconButton>
        </ListItem>
    )
}

export default DetailExtra
