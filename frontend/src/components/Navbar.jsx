import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Type Tales
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate('/leaderboard')}>
            Leaderboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
