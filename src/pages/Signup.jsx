import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl, 
  InputLabel
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import axios from "../config/AxiosInterceptor";
import Building1 from "../assets/building1.png"

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    userAgreement: false,
    builderAgreement: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!formData.userAgreement) {
      alert("Please accept the User Agreement.");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup data:", formData);
      try {
        const response = await axios({
          url: "/users/signup",
          data: JSON.stringify(formData),
          method: "post",
        });
        console.log(response);
        navigate("/otp-verification", { state: { email: formData.email } });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Container
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 2,
          }}
        >
          <Box sx={{ maxWidth: 400, width: "100%" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to First-Buy
            </Typography>
            <Typography variant="body1" color="textSecondary" marginBottom={2}>
              Please enter your details
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                size="small"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                size="small"
                label="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
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
                required
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <FormControl sx={{mt: 1}} fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                  margin="normal"
                  name="role"
                  required
                  error={Boolean(errors.role)}
                  helperText={errors.role}
                  size="small"
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="BUILDER">Builder</MenuItem>
                </Select>
              </FormControl>

              {/* User Agreement Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="userAgreement"
                    checked={formData.userAgreement}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I agree to the User Agreement"
              />
              <Accordion sx={{ boxShadow: "none", mt: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body2" color="primary">
                    View Terms & Conditions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    • I understand that First-Buy offers a ₹5000 joining bonus to help me save on my first home purchase.
                    <br />• I acknowledge that reward points are earned by scanning real bills and making transactions.
                    <br />• I agree not to misuse, fake, or manipulate transactions for the purpose of unfairly earning points.
                    <br />• First-Buy reserves the right to verify bills and cancel points if fraudulent activity is detected.
                    <br />• My points can only be redeemed for discounts on property purchases listed on First-Buy.
                    <br />• First-Buy does not guarantee home loans but may provide partnered financial assistance.
                    <br />•	I understand that First-Buy offers a ₹5000 joining bonus to help me save on my first home purchase.
                    <br />•	I acknowledge that reward points are earned by scanning real bills and making transactions.
                    <br />•	I agree not to misuse, fake, or manipulate transactions for the purpose of unfairly earning points.
                    <br />•	First-Buy reserves the right to verify bills and cancel points if fraudulent activity is detected.
                    <br />•	My points can only be redeemed for discounts on property purchases listed on First-Buy.
                    <br />•	First-Buy does not guarantee home loans but may provide partnered financial assistance.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 2,
                  padding: 1,
                  textTransform: "none",
                  backgroundColor: "#000",
                }}
              >
                Sign Up
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2, color: "#555" }}
              >
                Already have an account?{" "}
                <a href="/login" style={{ color: "#007bff" }}>
                  Login
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
            backgroundImage: `url(${Building1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
              color: "#fff",
              padding: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
            Your First Step to Homeownership Start's Here!
            </Typography>
            <Box sx={{backgroundColor: "silver",  borderRadius: 10, padding: 1}}>
            <Typography variant="body2" sx={{ maxWidth: 400, color: "black" }}>
            Sign up for free, unlock all features and earn bonus rewards.
            </Typography>
            </Box>
           
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
