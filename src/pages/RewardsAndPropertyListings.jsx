import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography,
  TextField, Button, Select, MenuItem, FormControl, InputLabel,
  Box, Chip, Divider
} from '@mui/material';
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const RewardsAndPropertyListings = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  const rewards = [
    { id: 1, title: '₹5000 Discount', pointsRequired: 5000, icon: <EmojiEventsIcon sx={{ color: '#FFD700' }} /> },
    { id: 2, title: '₹10000 Discount', pointsRequired: 10000, icon: <EmojiEventsIcon sx={{ color: '#FF4500' }} /> },
    { id: 3, title: 'Free Property Consultation', pointsRequired: 15000, icon: <EmojiEventsIcon sx={{ color: '#4CAF50' }} /> },
  ];

  useEffect(() => {
    if (!token) navigate("/login");
    fetchProperties();
  }, []);

  useEffect(() => {
    setFilteredProperties(filterProperties());
  }, [search, location, priceRange, properties]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`/api/v1/properties`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const redeemRewards = (reward) => {
    toast(`You got ${reward.title}`);
  };

  const filterProperties = () => properties.filter((property) => {
    return (
      property.name.toLowerCase().includes(search.toLowerCase()) &&
      (location ? property.location === location : true) &&
      (priceRange
        ? priceRange === 'below-50'
          ? property.price < 5000000
          : property.price >= 5000000
        : true)
    );
  });

  return (
    <Container sx={{ mt: 10 }}>
      {/* Rewards Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          <EmojiEventsIcon sx={{ mr: 1, color: '#FFD700' }} />
          Available Rewards
        </Typography>
        <Grid container spacing={3}>
          {rewards.map((reward) => (
            <Grid item xs={12} sm={6} md={4} key={reward.id}>
              <Card
                onClick={() => navigate("/transaction-brokerage")}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(145deg, #f5f7fa, #e6e9ef)`,
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                {reward.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>{reward.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Points Required: <strong>{reward.pointsRequired}</strong>
                </Typography>
                <Chip label="Redeem Now" color="primary" sx={{ mt: 2 }} clickable onClick={() => redeemRewards(reward)} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Filters Section */}
      <Box sx={{ mb: 4, p: 3, backgroundColor: '#f4f4f4', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField label="Search Properties" variant="outlined" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location">
                <MenuItem value="">All Locations</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Kolkata">Kolkata</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Price Range</InputLabel>
              <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} label="Price Range">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="below-50">Below ₹50,00,000</MenuItem>
                <MenuItem value="above-50">Above ₹50,00,000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Properties Section */}
      <Typography variant="h4" gutterBottom>
        <HomeIcon sx={{ mr: 1, color: '#4CAF50' }} />
        Available Properties
      </Typography>
      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}>

              {property.images && property.images.length > 0 && (
                property.images.length === 1 ? (
                  <CardMedia
                    sx={{ height: 200 }}
                    image={`data:image/jpeg;base64,${property.images[0]}`}
                    title="Property Image"
                  />
                ) : (
                  <Slider {...sliderSettings}>
                    {property.images.map((img, idx) => (
                      <div key={idx}>
                        <CardMedia
                          sx={{ height: 200 }}
                          image={`data:image/jpeg;base64,${img}`}
                          title={`Property Image ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>
                )
              )}

              <CardContent>
                <Typography variant="h6" gutterBottom>{property.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1 }} /> {property.location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <span style={{ textDecoration: "line-through", color: "gray" }}>
                    ₹{property.price.toLocaleString("en-IN")}
                  </span>{" "}
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    ₹{(property.price * (1 - (property.discount / 100))).toLocaleString("en-IN")}
                  </span>{" "}
                  <span style={{ color: "green", fontSize: "14px" }}>({property.discount}% OFF)</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{property.description}</Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: "#FF5722" }} /> Features: {property.features.join(", ")}
                </Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <ContactPhoneIcon sx={{ mr: 1, color: "#2196F3" }} /> Builder: {property.builder}, Contact: {property.contact}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  Points Required: {property.price * (property.discount / 100)}
                </Typography>
                <Typography variant="body2" gutterBottom>Id: {property.id}</Typography>
              </CardContent>
              <Button variant="contained" color="success" sx={{ mt: "auto", borderRadius: 0 }}>View Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RewardsAndPropertyListings;
