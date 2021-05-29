import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useAuth} from 'helpers/context';
import {loginUser} from 'services/currentUser'
import 'shared/css/authentication.css'

function Login(props) {
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [remember, setRemember] = useState(false);
    const [isError, setIsError] = useState(false);

    const history = useHistory();
    const locationState = props.location.state;
    const referer = locationState ? locationState.referer : '/';
    const {setAuthTokens} = useAuth();

    function postLogin(event) {
        event.preventDefault();
        loginUser(form)
            .then(tokens => {
                setAuthTokens(tokens, remember);
                history.push(referer);
            })
            .catch(error => {
                setIsError(true);
                throw error
            });
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <Container component="main" maxWidth="xs">
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
                        value={form.username}
                        onChange={updateForm}
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
                        value={form.password}
                        onChange={updateForm}
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
