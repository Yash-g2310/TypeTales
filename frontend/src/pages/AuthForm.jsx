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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to render different form contents
function FormContent({ isLogin, handleSubmit }) {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Reset errors when the user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let errors = {};
    if (!isLogin && !formValues.username) {
      errors.username = 'Username is required';
    }
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e, formValues);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      noValidate
      sx={{ mt: 2 }}
    >
      {!isLogin && (
        <TextField
          label="Username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={!!formErrors.username}
          helperText={formErrors.username}
        />
      )}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!formErrors.password}
        helperText={formErrors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={
          (isLogin && (!formValues.email || !formValues.password)) ||
          (!isLogin && (!formValues.username || !formValues.email || !formValues.password))
        }
      >
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

  const handleSubmit = (e, formValues) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login data:', formValues);
      // Handle login API call here.
    } else {
      console.log('Signup data:', formValues);
      // Handle signup API call here.
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Signup'}
        </Typography>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ mb: 2 }}
          aria-label="login or signup tabs"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        <FormContent isLogin={isLogin} handleSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
};

export default AuthForm;
