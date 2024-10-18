import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
} from '@mui/material';

// Function to render different form contents
function FormContent({ isLogin }) {
  return (
    <Box>
      {isLogin ? (
        <>
          <TextField label="Email" type="email" fullWidth margin="normal" />
          <TextField label="Password" type="password" fullWidth margin="normal" />
        </>
      ) : (
        <>
          <TextField label="Name" fullWidth margin="normal" />
          <TextField label="Email" type="email" fullWidth margin="normal" />
          <TextField label="Password" type="password" fullWidth margin="normal" />
        </>
      )}
      <Button variant="contained" color="primary" fullWidth>
        {isLogin ? 'Login' : 'Signup'}
      </Button>
    </Box>
  );
}

// Main component
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const handleTabChange = (event, newValue) => {
    setIsLogin(newValue === 0); // 0 is for Login, 1 is for Signup
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center">
          {isLogin ? 'Login' : 'Signup'}
        </Typography>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        <FormContent isLogin={isLogin} />
      </Paper>
    </Container>
  );
};

export default AuthForm;
