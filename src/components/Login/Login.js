import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../helpers/context';
import axios from 'axios';
import '../../shared/css/authentication.css'

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { authTokens, setAuthTokens } = useAuth();


    const baseUrl = process.env.REACT_APP_SERVER_ADDRESS + 'auth/'

    function postLogin(e) {
        e.preventDefault();
        const body = {
            username: username,
            password: password,
        };

        axios.post(`${baseUrl}jwt/create/`, body)
            .then((response) => {
                if (response.status === 200) {
                    setAuthTokens(response.data, remember);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            })
            .catch(e => {
                setIsError(true);
                console.log(e);
            });
    }

    const locationState = props.location.state;
    const referer = locationState ? locationState.referer : '/products';

    if (isLoggedIn || authTokens) {
        return <Redirect to={referer} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className='paper'>
                <Avatar className='avatar'>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
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
                        error={isError}
                        value={username}
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
                        error={isError}
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                    />
                    {
                        isError &&
                        <FormHelperText
                            error={true}
                        >
                            The username or password you entered is incorrect
                        </FormHelperText>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                onChange={(e) => (setRemember(e.target.checked))}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={postLogin}
                    >
                        Log In
                        </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link component={RouterLink} to="/register" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}


export default Login
