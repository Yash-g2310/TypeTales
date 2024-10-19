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
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FormContent = ({ isLogin, handleSubmit, loading }) => {
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Signup'}
      </Button>
    </Box>
  );
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = async (formValues) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(formValues.email, formValues.password);
        enqueueSnackbar('Login successful!', { variant: 'success' });
      } else {
        await signup(formValues.username, formValues.email, formValues.password);
        enqueueSnackbar('Signup successful!', { variant: 'success' });
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        <FormContent isLogin={isLogin} handleSubmit={handleSubmit} loading={loading} />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default AuthForm;
