import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios';
import 'shared/css/authentication.css'

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const baseUrl = process.env.REACT_APP_SERVER_ADDRESS + 'auth/'

    function postRegister(e) {
        e.preventDefault();

        const body = {
            username: username,
            password: password,
        };

        axios.post(`${baseUrl}users/`, body)
            .then(response => {
                if (response.status === 201) {
                    props.history.push('/products');
                }
            })
            .catch(e => {
                console.log(e.response);
                if (e.response) {
                    const { data } = e.response
                    setUsernameError(data.username);
                    setPasswordError(data.password);
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className='paper'>
                <Avatar className='avatar'>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={Boolean(usernameError)}
                        value={username}
                        helperText={usernameError ? usernameError : 'Letters, digits and @/./+/-/_ only.'}
                        onChange={(e) => (setUsername(e.target.value))}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={Boolean(passwordError)}
                        value={password}
                        helperText={passwordError ? passwordError : 'It must contain at least 8 characters'}
                        onChange={(e) => (setPassword(e.target.value))}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={postRegister}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/login" >
                                {"Already have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Register
