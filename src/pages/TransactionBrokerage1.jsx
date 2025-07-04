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
    Snackbar,
    Grid,
} from "@mui/material";

import { toast } from "react-toastify";
import axios from "../config/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

// Mock API Service
const calculateBrokerageFee = async (propertyId, pointsRedeemed) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ brokerageFee: pointsRedeemed * 0.20 });
        }, 500);
    });
};

const TransactionAndBrokeragePage = ({ userId = "userId" }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCalculator, setShowCalculator] = useState(false);
    const [propertyId, setPropertyId] = useState("");
    const [pointsRedeemed, setPointsRedeemed] = useState(0);
    const [brokerageFee, setBrokerageFee] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

   
    const navigate = useNavigate()

    const loadTransactions = async (userId = "userid") => {
        try {
            const response = await axios.get("/api/v1/transactions/my-transactions")
            setTransactions(response.data.filter(transaction => transaction.pointsRedeemed));

        } catch (err) {
            console.log(err)
        }
    };


   
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        loadTransactions();
    }, []);

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
            const { brokerageFee: fee } = await calculateBrokerageFee(propertyId, pointsRedeemed);
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

    const redeem = async () => {
        try {
            const body = {
                propertyName: propertyId,
                pointsRedeemed,
                brokerageFee
            }

            const response = await axios.post("/api/v1/transactions/redeem", body)
            setTransactions([...transactions, response.data]);

        } catch (err) {
            toast.error(err.message)
        } finally {
            handleCloseCalculator();
        }
    }

    const formatDate = (date) => {
        const [year, month, day] = date.split("-").map(Number);

        const dateObject = new Date(year, month - 1, day); // month is 0-based

        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return dateObject.toLocaleDateString('en-US', options);
    }

    return (
        <Box sx={{ p: 3, mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Transaction and Brokerage Integration
            </Typography>

            <Grid container spacing={3}>
                {/* Redemption Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Redeem Points for Property Discounts
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowCalculator(true)}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Redeem Points
                        </Button>

                        {/* Brokerage Fee Calculator Modal */}
                        <Modal open={showCalculator} onClose={handleCloseCalculator}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Redeem Points
                                </Typography>

                                <TextField
                                    label="Property ID"
                                    fullWidth
                                    value={propertyId}
                                    onChange={(e) => setPropertyId(e.target.value)}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Points to Redeem"
                                    type="number"
                                    fullWidth
                                    value={pointsRedeemed}
                                    onChange={(e) => setPointsRedeemed(Number(e.target.value))}
                                    sx={{ mb: 2 }}
                                />

                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCalculateFee}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    >
                                        Calculate Fee
                                    </Button>
                                )}

                                {brokerageFee !== null && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1">
                                            Brokerage Fee: ₹{brokerageFee.toFixed(2)}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={redeem}
                                        >
                                            Confirm Redemption
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Modal>
                    </Paper>
                </Grid>

                {/* Transaction History Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Transaction History
                        </Typography>

                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Alert severity="error">{error}</Alert>
                        ) : transactions.length > 0 ? (
                            <List>
                                {transactions?.map((transaction) => (
                                    <Paper key={transaction.id} sx={{ mb: 2, p: 2 }}>
                                        <ListItem>
                                            <ListItemText
                                                primary={transaction.propertyName}
                                                secondary={
                                                    <>
                                                        <Typography variant="body2">
                                                            Points Redeemed: {transaction.pointsRedeemed}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Brokerage Fee: ₹{transaction.brokerageFee.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Date: {formatDate(transaction.date)}
                                                        </Typography>
                                                        <Typography variant="body2">Status: {transaction.status}</Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                    </Paper>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1">No transactions found.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TransactionAndBrokeragePage;