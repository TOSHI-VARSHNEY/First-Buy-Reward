import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid2 as Grid,
  Box,
  Container,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from '../config/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import Building2 from "../assets/building2.png"

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on input
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('/api/v1/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('userId', response.data.user.id);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred during login';
      toast.error(errorMessage);
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Handle google login")
    window.location.href = 'https://first-buy.in/oauth2/authorize/google'
  }


  return (
    <Container
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
      }}
    >
      <Grid container>
        {/* Left Side: Login Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 3,
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Please enter your details
            </Typography>

            {/* Google Sign-In Button */}
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none', mb: 2, borderColor: '#d3d3d3', color: '#000' }}
              onClick={handleGoogleLogin}
            >
              <img
                src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
                alt="Google Logo"
                style={{ width: 18, marginRight: 8 }}
              />
              Sign in with Google
            </Button>

            <Box sx={{ textAlign: 'center', my: 2 }}>— or —</Box>

            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                size="small"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <label>
                  <input type="checkbox" />
                  Remember for 30 days
                </label>
                <a href="/reset-password" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 1, textTransform: 'none', backgroundColor: '#000' }}
              >
                Sign in
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: '#555' }}
              >
                Don’t have an account?{' '}
                <a href="/signup" style={{ color: '#007bff' }}>
                  Sign up
                </a>
              </Typography>
            </form>
          </Box>
        </Grid>

        {/* Right Side: Image */}
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            backgroundImage: `url(${Building2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%',
              color: '#fff',
              padding: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
            Your First Step to Homeownership Start's Here!
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 400, backgroundColor: "silver", color: "black", borderRadius: 10, paddingLeft: 1 }}>
            Sign up for free, unlock all features and earn bonus rewards.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;