import React from 'react'
import {useRouteMatch, Link} from 'react-router-dom'
import {
    TableContainer, Table, TableHead,
    TableBody, TableFooter, TableRow,
    TableCell, Container, Paper, Button,
    CircularProgress,
} from '@material-ui/core';
import './index.css'

function ProductTableScreen(props) {
    let {url} = useRouteMatch();

    return (
        <Container maxWidth='md'>
            <div>
                <h1 className='central-title'>{props.title}</h1>
                <Paper elevation={3}>
                    <TableContainer id='table'>

                        <Table>

                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Name</TableCell>
                                    <TableCell align='center'>Current stock (Lts.)</TableCell>
                                    <TableCell align='center'>Liter cost</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {props.loading ?
                                    <TableRow>
                                        <TableCell align='center'></TableCell>
                                        <TableCell align='center'>
                                            <CircularProgress />
                                        </TableCell>
                                        <TableCell align='center'></TableCell>
                                    </TableRow>

                                    : props.rows
                                }
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell size='small' variant='footer'>
                                        Total: {props.rows ? props.rows.length : 'Couldn\'t find any products'}
                                    </TableCell>
                                    <TableCell align='center'></TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Paper>
                <div>
                    <Button color="primary"
                        variant="contained"
                        component={Link} to={`${url}/create`} >
                        Create new
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default ProductTableScreen
