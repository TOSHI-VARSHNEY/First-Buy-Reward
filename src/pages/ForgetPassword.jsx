import React, { useState } from "react";
import axios from '../config/AxiosInterceptor';

import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleResetPassword = async () => {
    const data = {
      email: email,
      password: password,
    };

    if (!email) throw "Invalid Data";
    if (!password) throw "Invalid Data";
    try {
      const response = await axios.put("/api/v1/users/reset-password", JSON.stringify(data),
        {headers: { "Content-Type": "application/json" }});

      if (response.status === 200) {
        toast.success("Password reset successfull");
        console.log("Response Data", response.data);
        navigate("/login");
      } else {
        throw "Error Occured";
      }
    } catch (err) {
      console.log("ERRRR: ", err.response.data.errorMessage)
      toast.error(err.response.data.errorMessage);
    }
  };

  return (
    <div style={{ paddingLeft: "30%", paddingTop: 150 }}>
      <Box noValidate sx={{ mt: 3, width: 400 }}>
        <Typography sx={{ marginBottom: 5 }}>Reset Password</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          onClick={() => handleResetPassword()}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
      </Box>
    </div>
  );
};

export default ForgetPassword;
