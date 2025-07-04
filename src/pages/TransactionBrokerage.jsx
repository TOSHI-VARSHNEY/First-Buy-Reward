import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Snackbar
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// Mock API Service
const fetchTransactions = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          propertyName: "Sunrise Apartments",
          pointsRedeemed: 1000,
          brokerageFee: 500,
          transactionDate: "2023-10-01T12:34:56",
          status: "Completed",
        },
        {
          id: 2,
          propertyName: "Ocean View Villas",
          pointsRedeemed: 1500,
          brokerageFee: 750,
          transactionDate: "2023-10-05T14:20:10",
          status: "Pending",
        },
      ]);
    }, 1000);
  });
};

const calculateBrokerageFee = async (propertyId, pointsRedeemed) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ brokerageFee: pointsRedeemed * 0.5 }); // Example calculation
    }, 500);
  });
};

const TransactionBrokerage = ({ userId="some_id" }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [pointsRedeemed, setPointsRedeemed] = useState(0);
  const [brokerageFee, setBrokerageFee] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch transactions on component mount
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTransactions(userId);
        setTransactions(data);
      } catch (err) {
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadTransactions();
    }
  }, [userId]);

  // Handle brokerage fee calculation
  const handleCalculateFee = async () => {
    if (!propertyId || pointsRedeemed <= 0) {
      setSnackbarMessage("Please enter valid property ID and points.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { brokerageFee: fee } = await calculateBrokerageFee(
        propertyId,
        pointsRedeemed
      );
      setBrokerageFee(fee);
    } catch (err) {
      setSnackbarMessage("Failed to calculate brokerage fee. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Close the brokerage fee calculator
  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setPropertyId("");
    setPointsRedeemed(0);
    setBrokerageFee(null);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, []);

  return (
    <Box sx={{ p: 4, mt: 5, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          p: 1,
          borderRadius: 2,
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          color: "white",
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
          Transaction History
        </Typography>
      </Box>

      {/* Redeem Points Button */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowCalculator(true)}
          sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
        >
          Redeem Points
        </Button>
      </Box>

      {/* Brokerage Fee Calculator Modal */}
      <Modal open={showCalculator} onClose={handleCloseCalculator}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            border: "2px solid #2575fc",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#2575fc", textAlign: "center", fontWeight: "bold" }}
          >
            Redeem Points
          </Typography>

          <TextField
            label="Property ID"
            fullWidth
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            sx={{ mb: 2, backgroundColor: "#fafafa" }}
          />

          <TextField
            label="Points to Redeem"
            type="number"
            fullWidth
            value={pointsRedeemed}
            onChange={(e) => setPointsRedeemed(Number(e.target.value))}
            sx={{ mb: 2, backgroundColor: "#fafafa" }}
          />

          {loading ? (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculateFee}
              disabled={loading}
              fullWidth
              sx={{ mb: 2, py: 1.5 }}
            >
              Calculate Fee
            </Button>
          )}

          {brokerageFee !== null && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                Brokerage Fee: ₹{brokerageFee.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
                onClick={handleCloseCalculator}
              >
                Confirm Redemption
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Transaction History List */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : transactions.length > 0 ? (
        <List>
          {transactions.map((transaction) => (
            <Paper
              key={transaction.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "white",
                boxShadow: 3,
              }}
            >
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: "#2575fc" }}>
                      {transaction.propertyName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        <strong>Points Redeemed:</strong> {transaction.pointsRedeemed}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Brokerage Fee:</strong> ₹{transaction.brokerageFee.toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Date:</strong>{" "}
                        {transaction.transactionDate.split("-").map(Number)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {transaction.status}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#757575" }}>
          No transactions found.
        </Typography>
      )}

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TransactionBrokerage;
