import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Header = ({ cartItemCount, user, onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    if (onLogout) {
      onLogout();
    }
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          E-Commerce Test Demo
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/products')}
          >
            Produits
          </Button>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
              >
                <Person />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">
                    Connecté en tant que: <strong>{user.username}</strong> 
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Se déconnecter
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
            >
              Connexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 