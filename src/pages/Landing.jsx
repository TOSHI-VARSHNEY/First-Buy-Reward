import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RedeemIcon from "@mui/icons-material/Redeem";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";
import api from "../config/AxiosInterceptor";

const LandingPage = () => {
  const navigate = useNavigate();

    useEffect(() => {
      const handleOAuthCallback = async () => {
        try {
          const response = await api.get('/oauth2/callback/google');
          
          console.log("Response: ", response);
          if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('userId', response.data.user.id);
            // navigate('/dashboard');
          } 
        } catch (error) {
          navigate('/login?error=oauth_failed');
        }
      };
  
      handleOAuthCallback();
    }, [navigate]);
  return (
    <Container sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Your Reward Property Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Scan your bills, earn reward points, and redeem property discounts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ textTransform: "none" }}
        >
          Get Started Now
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                <CheckCircleOutlineIcon />
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  User Registration & Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign up, log in, manage profiles, verify emails, and reset passwords easily.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid onClick={()=> navigate("/bill-scan")} item xs={12} md={6} lg={6}>
            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", mb: 2 }}>
                <ReceiptLongIcon />
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Bill Scanning & OCR
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload receipts, extract key details, and earn reward points.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid onClick={()=> navigate("/points-dashboard")} item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "error.main", mx: "auto", mb: 2 }}>
                <RedeemIcon />
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Points & Rewards System
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track points and redeem them for property discounts and rewards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid onClick={()=> navigate("/rewards-dashboard")} item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "error.main", mx: "auto", mb: 2 }}>
                <RedeemIcon />
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Available Rewards and Properties
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track points and choose properties for rewards redemptions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Property Section */}
      <Box sx={{ py: 6, backgroundColor: "background.default" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Discover Properties
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Browse properties, check discounts, and find your dream home.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Property Listings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View property details like price, location, and builder information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Property Discounts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use reward points to unlock exclusive discounts on properties.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Start Earning and Redeem Your Rewards Today!
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Sign Up Now
        </Button>
      </Box>

      {/* Builder & Admin Features */}
      <Box sx={{ py: 6, backgroundColor: "background.paper" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Builder and Admin Dashboards
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BusinessIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Builder Dashboard
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Manage properties, set up discounts, and track leads easily.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BusinessIcon color="secondary" />
                  <Typography variant="h6" fontWeight="bold">
                    Admin Dashboard
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Oversee users, validate receipts, and monitor platform analytics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingPage;
