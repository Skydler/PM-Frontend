import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getComponentsOfProduct } from 'services/products'
import axios from 'services/index'
import { ListSubheader } from '@material-ui/core';

function DetailExtra(props) {
    const [components, setComponents] = useState()
    const product = props.product

    function handleRequests() {
        getComponentsOfProduct(product).then(componentsArray => {
            const componentsList = renderComponents(componentsArray);
            setComponents(componentsList);
        })

    }

    function renderComponents(components) {
        const components_list = components.map(comp =>
            <SubProductListItem composition={comp} />
        )
        return components_list
    }

    if (!components) {
        handleRequests();
    }

    return (

        <div>
            <List>
                <ListItem>Makeable amount: {product.makeable_amount}</ListItem>
            </List>

            <List
                subheader={
                    <ListSubheader component="div">
                        Made with:
                    </ListSubheader>
                }
            >
                {components}
            </List>
        </div >
    )
}

function SubProductListItem(props) {
    const [subproduct, setSubproduct] = useState('');
    const comp = props.composition

    function handleRequests() {
        axios.get(comp.subproduct).then(response =>
            setSubproduct(response.data)
        )
    }

    if (!subproduct) {
        handleRequests()
    }

    return <ListItem key={comp.id} >{`${subproduct.name}: ${comp.quantity}`}</ListItem>
}

export default DetailExtra
