import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { getUser } from 'services/currentUser'
import ProductList from 'components/Stock/Product'
import { Link } from 'react-router-dom'
import { useAuth } from 'helpers/context';

import './TopBar.css'

export default function TopAppBar() {
  const [username, setUsername] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const { setAuthTokens } = useAuth();

  if (!username) {
    getUser().then((user) => {
      setUsername(user.username);
    });
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event) {
    setAnchorEl(null);
  }

  function handleLogout(event) {
    setAuthTokens(null);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Maybe in the future it serves a purpose
          <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className="title">
            <Link to='/products' className="link">
              Product Manager
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleClick}>{username}</Button>
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
      <ProductList></ProductList>
    </div>
  );
}
