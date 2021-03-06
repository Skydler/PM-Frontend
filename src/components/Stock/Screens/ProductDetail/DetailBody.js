import React from 'react'
import Grid from '@material-ui/core/Grid';

import GridProductProp from './GridProductProp'
import './index.css'

function DetailBody(props) {
    const product = props.product

    return (
        <div >
            <Grid
                container
                spacing={2}
                direction='row'
                justify='center'
            >
                <GridProductProp
                    label='Current amount: '
                    info={product.current_amount + ' Lts.'}
                />
                <GridProductProp
                    label='Base production cost: '
                    info={'$' + product.price}
                />
            </Grid>
        </div >
    )
}

export default DetailBody
