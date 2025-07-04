import {useEffect} from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import PropertyManagement from "../components/PropertyManagement";
import LeadManagement from "../components/LeadManagement";
import { useNavigate } from "react-router-dom";

const BuilderDashboard = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    if(role!=="BUILDER"){
      navigate("/")
    }
  }, []);

  const analyticsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Property Views",
        data: [120, 150, 200, 180, 300, 250],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Leads",
        data: [40, 60, 80, 100, 120, 140],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ padding: 3, mt: 10 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center", color: "primary.main" }}>
        Builder Dashboard
      </Typography>

      {/* Analytics Overview */}
      <Card
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: 5,
        background: "linear-gradient(to right, #e0f7fa, #e1bee7)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#4a148c",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Analytics Overview
        </Typography>
        <Grid container spacing={4}>
          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: 3,
              }}
            >
              <Bar
                data={analyticsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: { color: "#4a148c", font: { size: 12 } },
                    },
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Metrics Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f3e5f5",
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#4a148c",
                  textTransform: "capitalize",
                }}
              >
                Key Metrics
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0.5,
                  backgroundColor: "#ede7f6",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: "#4a148c" }}>
                  Total Properties Listed:
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  15
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0.5,
                  backgroundColor: "#ede7f6",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: "#4a148c" }}>
                  Total Leads:
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  120
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0.5,
                  backgroundColor: "#ede7f6",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: "#4a148c" }}>
                  Total Discounts Offered:
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ₹5,00,000
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0.5,
                  backgroundColor: "#ede7f6",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: "#4a148c" }}>
                  Monthly Property Views:
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  1,000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

      {/* Property Management */}
      <PropertyManagement/>

      {/* Lead Management */}
      <LeadManagement/>
    </Box>
  );
};

export default BuilderDashboard;
