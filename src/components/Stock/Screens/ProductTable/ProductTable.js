import React from 'react'
import {useRouteMatch, Link} from 'react-router-dom'

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import './ProductTable.css'
// import {CircularProgress} from '@material-ui/core';

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
                                {props.rows}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    {/* {props.loading ? */}
                                    {/*     <CircularProgress /> : */}
                                    {/*     <TableCell size='small' variant='body'> */}
                                    {/*         Total: {props.rows ? props.rows.length : 'Couldn\'t find any products'} */}
                                    {/*     </TableCell>} */}
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Paper>
                <div>
                    <Link to={`${url}/create`}>Create new</Link>
                </div>
            </div>
        </Container>
    )
}

export default ProductTableScreen
