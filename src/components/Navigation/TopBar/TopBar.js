import React, {useState, useContext} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom'
import {useAuth} from 'helpers/context';
import {UserContext} from 'hooks/userContext'

import './TopBar.css'

export default function TopAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const {setAuthTokens} = useAuth();
    const user = useContext(UserContext);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogout() {
        setAuthTokens(null);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        <Link to='/' className="link">
                            Product Manager
            </Link>
                    </Typography>
                    <Button color="inherit" onClick={handleClick}> {user ? user.username : ''} </Button>
                    <Menu
                        className="profile-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
