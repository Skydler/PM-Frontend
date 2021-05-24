import React, {useState} from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {Link as RouterLink} from 'react-router-dom'
import {registerUser} from 'services/currentUser'
import 'shared/css/authentication.css'

function Register(props) {
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [errAlerts, setErrAlerts] = useState({
        username: '',
        password: '',
    })

    function postRegister(e) {
        e.preventDefault();
        registerUser(form)
            .then(() => {
                props.history.push('/login');
            })
            .catch(e => {
                const {data} = e.response
                setErrAlerts(data)
            })
    }

    function updateForm(event) {
        setForm({...form, [event.target.name]: event.target.value})
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
                        error={Boolean(errAlerts.username)}
                        value={form.username}
                        helperText={errAlerts.username || 'Letters, digits and @/./+/-/_ only.'}
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
                        error={Boolean(errAlerts.password)}
                        value={form.password}
                        helperText={errAlerts.password || 'It must contain at least 8 characters'}
                        onChange={updateForm}
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
