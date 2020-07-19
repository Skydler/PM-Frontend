import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function GridProductProp(props) {
    return (
        <Grid item>
            <Paper
                className='grid-product-prop'
            >
                {props.label}{props.info}
            </Paper>
        </Grid>
    )
}

export default GridProductProp
