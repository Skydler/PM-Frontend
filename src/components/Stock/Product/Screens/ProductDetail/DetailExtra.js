import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getComponentsOfProduct } from 'services/products'


function DetailExtra(props) {
    const [components, setComponents] = useState()

    function renderComponents(components) {
        const components_list = components.map(comp =>
            // <ProductRow key={prod.id} product={prod} />
            <ListItem key={comp.id} >comp.name</ListItem>
        )
        return components_list
    }

    function fetchCompositions() {
        getComponentsOfProduct(props.product).then(componentsArray => {
            const componentsList = renderComponents(componentsArray);
            setComponents(componentsList);
        })
    }

    function renderMeasures() {
        return <ListItem>Hola</ListItem>
    }

    return (

        <div>

            <List>
                {components}
            </List>

            <List>
                {renderMeasures()}
            </List>

        </div>
    )
}

export default DetailExtra
