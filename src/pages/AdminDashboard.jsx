import {useEffect} from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import PropertyManagement from "../components/PropertyManagement";
import UserManagement from "../components/UserManagement";
import ReceiptManagement from "../components/ReceiptManagement";
import { useNavigate } from 'react-router-dom';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    
    if(role!=="ADMIN"){
      navigate("/")
    }
    if (!token) {
      navigate("/login")
    }
  }, []);

  const analyticsData = {
    labels: ["Bill Scans", "Points Earned", "Property Views", "Users Registered"],
    datasets: [
      {
        label: "Analytics Overview",
        data: [250, 50000, 1200, 500],
        backgroundColor: ["#3f51b5", "#2196f3", "#4caf50", "#ff9800"],
        borderRadius: 5,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={3} bgcolor={theme.palette.background.default} sx={{mt: 10}}>
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Management */}
      <UserManagement/>

      {/* Receipt Verification */}
      <ReceiptManagement/>

      {/* Property Management */}
      <PropertyManagement/>

      {/* Analytics */}
      <Card 
  sx={{
    mb: 3,
    borderRadius: 2,
    boxShadow: 5,
    background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    color: theme.palette.common.white,
  }}
>
  <CardContent>
    <Typography
      variant="h5"
      sx={{
        color: theme.palette.common.white,
        fontWeight: "bold",
        textAlign: "center",
        mb: 2,
      }}
    >
      Analytics Overview
    </Typography>
    <Grid container spacing={3} alignItems="center">
      {/* Chart Section */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: theme.palette.common.white,
            borderRadius: 2,
            padding: 2,
            boxShadow: 2,
          }}
        >
          <Bar
            data={analyticsData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </Box>
      </Grid>
      
      {/* Analytics Data Section */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            background: theme.palette.background.paper,
            borderRadius: 2,
            padding: 3,
            boxShadow: 2,
          }}
        >
          {[
            { label: "Bill Scans", value: 250 },
            { label: "Points Earned", value: "50,000" },
            { label: "Property Views", value: "1,200" },
            { label: "Users Registered", value: 500 },
          ].map((item, index) => (
            <Typography
              key={index}
              variant="subtitle1"
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              {item.label}:{" "}
              <span
                style={{
                  color: theme.palette.secondary.main,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                {item.value}
              </span>
            </Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  </CardContent>
</Card>

    </Box>
  );
};

export default AdminDashboard;
