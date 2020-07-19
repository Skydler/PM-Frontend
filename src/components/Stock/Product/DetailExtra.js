import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { getComponentsOfProduct } from 'services/products'


function DetailExtra(props) {
    // const [components, setComponents] = useState()
    const [components] = useState()
    const product = props.product

    // Acá podría ir el listado de los subproductos con los que se conforma este producto si tiene
    // pensar más

    // function renderComponents(components) {
    //     const components_list = components.map(comp =>
    //         // <ProductRow key={prod.id} product={prod} />
    //         <ListItem key={comp.id} >comp.name</ListItem>
    //     )
    //     return components_list
    // }

    // function fetchCompositions() {
    //     getComponentsOfProduct(props.product).then(componentsArray => {
    //         const componentsList = renderComponents(componentsArray);
    //         setComponents(componentsList);
    //     })
    // }

    function renderMeasures() {
        return <ListItem>Makeable amount: {product.makeable_amount}</ListItem>
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
