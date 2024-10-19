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
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear errors on change
  };

  const validate = () => {
    const errors = {};
    if (!isLogin && !formValues.username) errors.username = 'Username is required';
    if (!formValues.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formValues.email)) errors.email = 'Enter a valid email';
    if (!formValues.password) errors.password = 'Password is required';
    else if (formValues.password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(formValues);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 2 }}>
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {isLogin ? 'Login' : 'Signup'}
      </Button>
    </Box>
  );
}

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleSubmit = (formValues) => {
    if (isLogin) {
      // Call the login API here and on success:
      login();
    } else {
      // Call the signup API here and on success:
      login();
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
          onChange={(e, value) => setIsLogin(value === 0)}
          centered
          sx={{ mb: 2 }}
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
