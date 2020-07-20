import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getComponentsOfProduct } from 'services/products'
import axios from 'services/index'
import { ListSubheader } from '@material-ui/core';

function DetailExtra(props) {
    const [components, setComponents] = useState()
    const product = props.product

    useEffect(() => {
        getComponentsOfProduct(product).then(components => {
            const componentsList = components.map(comp =>
                <SubProductListItem composition={comp} />
            )
            setComponents(componentsList);
        })
    }, [product])

    return (
        <div>
            <List>
                <ListItem>Makeable amount: {product.makeable_amount}</ListItem>
            </List>

            <List subheader={<ListSubheader component="div"> Made with: </ListSubheader>} >
                {components}
            </List>
        </div >
    )
}

function SubProductListItem(props) {
    const [subproduct, setSubproduct] = useState('');
    const comp = props.composition

    useEffect(() => {
        axios.get(comp.subproduct).then(response =>
            setSubproduct(response.data)
        )
    }, [comp.subproduct])

    return <ListItem key={comp.id} >{`${subproduct.name}: ${comp.quantity}`}</ListItem>
}

export default DetailExtra
