import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Type Tales
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/leaderboard')}>
            Leaderboard
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/login')}>
            Logout
          </Button>
        </Toolbar>
      </Container>
      {/* Responsive Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigation('/leaderboard')}>Leaderboard</MenuItem>
        <MenuItem onClick={() => handleNavigation('/login')}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
