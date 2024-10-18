import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Optional: Menu icon for mobile view

const Navbar = () => {
  const handleHomeClick = () => {
    // Handle navigation to Home
    console.log('Home clicked');
  };

  const handleProfileClick = () => {
    // Handle navigation to Profile
    console.log('Profile clicked');
  };

  const handleLeaderboardClick = () => {
    // Handle navigation to Leaderboards
    console.log('Leaderboards clicked');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
          <Button color="inherit" onClick={handleProfileClick}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLeaderboardClick}>
            Leaderboards
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
