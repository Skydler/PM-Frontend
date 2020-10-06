import React, {useState} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom'
import {useAuth} from 'helpers/context';

import './TopBar.css'

export default function TopAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const {setAuthTokens} = useAuth();
  const user = props.user;

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
            <Link to='/home' className="link">
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
