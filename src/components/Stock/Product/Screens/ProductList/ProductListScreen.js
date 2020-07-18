import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import './ProductList.css'

function ProductListScreen(props) {
    let { url } = useRouteMatch();

    return (
        <Container maxWidth='md'>
            <div>
                <h1 className='central-title'>Dashboard</h1>
                <Paper elevation={3}>
                    <TableContainer id='table'>
                        <Table>

                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Product name</TableCell>
                                    <TableCell align='center'>Current stock (Lts.)</TableCell>
                                    <TableCell align='center'>Liter cost</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {props.products}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell size='small' variant='body'>
                                        Total Products: {props.products ?
                                            props.products.length : 'Couldn\'t find any products'}
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Paper>
                <div>
                    <Link to={`${url}/create`}>Create product</Link>
                </div>
            </div>
        </Container>
    )
}

export default ProductListScreen
