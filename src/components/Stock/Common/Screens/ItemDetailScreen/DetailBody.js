import React from 'react'
import Grid from '@material-ui/core/Grid';

import GridProductProp from './GridProductProp'
import './index.css'

function DetailBody(props) {
    const item = props.item

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
                    info={item.current_amount + ' Lts.'}
                />
                <GridProductProp
                    label='Base production cost: '
                    info={'$' + (item.price || item.cost)}
                />
            </Grid>
        </div >
    )
}

export default DetailBody
