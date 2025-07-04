import React, {useEffect} from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate, useSearchParams } from "react-router-dom";
import Building3 from "../assets/building3.png"
import { toast } from "react-toastify";


const LandingPage = () => {
  const navigate = useNavigate();
  const [params]  = useSearchParams();

  const role = localStorage.getItem('role');

  const navigateToAdmin = () => {
    if(role === 'ADMIN') {
      navigate("/admin-dashboard")
    }else{
      toast.warn("You are not allowed to access this page.")
    }
  }

  const navigateToBuilder = () => {
    if(role === 'BUILDER') {
      navigate("/builder-dashboard")
    }else{
      toast.warn("You are not allowed to access this page.")
    }
  }

  useEffect(()=> {
    if(params.get("token")){
      console.log("token", params.get("token"))
      localStorage.setItem("token", params.get("token"));
      localStorage.setItem("name", params.get("name"));
      localStorage.setItem("role", params.get("role"));
      localStorage.setItem("id", params.get("id"));
    }
  },[])


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
          backgroundImage: `url(${Building3})`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Your Reward Property Platform
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "white" }}>
          Scan your bills, earn reward points and redeem property discounts
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
          <Grid onClick={() => navigate("/transaction-brokerage")} item xs={12} md={6} lg={6}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%", cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                <CheckCircleOutlineIcon />
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Transactions & Brokerage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check the details of transactions and brokerages
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid onClick={() => navigate("/bill-scan")} item xs={12} md={6} lg={6}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%", cursor: "pointer" }}>
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
          <Grid onClick={() => navigate("/points-dashboard")} item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%", cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "error.main", mx: "auto", mb: 2 }}>
                <EmojiEventsIcon />
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
          <Grid onClick={() => navigate("/rewards-dashboard")} item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%", cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "success.main", mx: "auto", mb: 2 }}>
                <HomeWorkIcon />
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
        <Grid container spacing={4} onClick={() => navigate("/rewards-dashboard")} sx={{ cursor: "pointer" }}>
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
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }} onClick={() => navigate("/signup")}>
          Sign Up Now
        </Button>
      </Box>
      {/* Builder & Admin Features */}
      <Box sx={{ py: 6, px: 2, backgroundColor: "background.paper" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Builder and Admin Dashboards
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card onClick={() => navigateToBuilder()} sx={{ cursor: "pointer" }}>
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
            <Card onClick={() => navigateToAdmin()} sx={{ cursor: "pointer" }}>
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
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => window.open("https://forms.gle/Y5wABs27yyRyzRQM9", "_blank")}
          >
            Explore More Properties
          </Button>
        </Box>

      </Box>
    </Container>
  );
};

export default LandingPage;
