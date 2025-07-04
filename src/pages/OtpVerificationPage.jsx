import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Grid2 as Grid } from "@mui/material";
import axios from '../config/AxiosInterceptor';
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Building3 from "../assets/building3.png"
const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Handle OTP input change
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 6) { // Allow only numbers up to 6 digits
      setOtp(value);
      setError("");
    } else {
      setError("OTP must be a 6-digit number.");
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required.");
    } else if (otp.length !== 4) {
      setError("OTP must be exactly 4 digits.");
    } else {
      console.log("OTP Submitted:", otp);
      

      try {
        const response = await axios({
          url: '/users/verify-otp',
          data: JSON.stringify({otp, email}),
          method: 'post',
        });
        toast.success("Email verified successfully. You got 5000 points on signup.");
        navigate("/login")
      } catch (error) {
        toast.error(error);
        console.error('Error fetching data:', error);
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
        {/* Left Side: OTP Verification Form */}
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
          <Box sx={{ maxWidth: 450, width: "100%", minHeight: "400px" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Verify Your Account
            </Typography>
            <Typography variant="body1" color="textSecondary" marginBottom={2}>
              Enter the 4-digit OTP sent to your email/phone.
            </Typography>

            {/* OTP Input Field */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                size="small"
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(error)}
                helperText={error}
                inputProps={{ maxLength: 6 }}
              />

              {/* Submit Button */}
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
                Verify OTP
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2, color: "#555" }}
              >
                Didn't receive the OTP?{" "}
                <a href="/resend-otp" style={{ color: "#007bff" }}>
                  Resend
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
            backgroundImage: `url(${Building3})`,
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
              Secure Your Account
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 400, backgroundColor: "silver", color: "black", borderRadius: 10, paddingLeft: 2 }}>
              Verify your email or phone number to proceed with secure access to
              your account.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OTPVerificationPage;
