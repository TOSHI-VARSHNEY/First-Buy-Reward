import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button, TextField,
  Modal, Box, LinearProgress, Tooltip, IconButton, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import axios from "../config/AxiosInterceptor";

Chart.register(...registerables);

const EnhancedPointsDashboard = () => {
  const [billAmount, setBillAmount] = useState('');
  const [totalPoints, setTotalPoints] = useState(1200); 
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=> {
    if(!token) navigate("/login")
  }, [])

  useEffect(()=> {
    getMyTransactions();
  },[])

  const totalPointsEarned = () => transactions.reduce((total, transaction)=> total+transaction.pointsEarned, 0)
  const totalPointsRedeemed = () => transactions.reduce((total, transaction)=> total+transaction.pointsRedeemed, 0)

  // sample data
  const transactions1 = [
    { date: '2023-01-01', billAmount: 200, pointsEarned: 2000, pointsRedeemed: 2000 },
    { date: '2023-01-05', billAmount: 500, pointsEarned: 5000, pointsRedeemed: 2000 },
    { date: '2023-01-10', billAmount: 100, pointsEarned: 1000, pointsRedeemed: 500 },
    { date: '2023-01-15', billAmount: 300, pointsEarned: 3000, pointsRedeemed: 1000 }
  ];

  const getMyTransactions = async () => {
    
    try{
      const response = await axios.get("/api/v1/transactions/my-transactions")
      setTransactions([...response.data].filter(transaction => transaction.pointsEarned));
    }catch(err){
      console.error(err);
    }
  }



  const barChartData = {
    labels: transactions.map((tx) => `₹${tx.billAmount} (${tx.date})`),
    datasets: [
      {
        label: 'Points Earned',
        backgroundColor: ['#1976D2', '#E91E63', '#4CAF50', '#FFC107'],
        data: transactions.map((tx) => tx.pointsEarned),
      },
    ],
  };

  const pieChartData = {
    labels: ['Points Earned', 'Points Remaining'],
    datasets: [
      {
        data: [totalPointsEarned(), totalPointsEarned() - totalPointsRedeemed()],
        backgroundColor: ['#4CAF50', '#FF5722'],
      },
    ],
  };

  const lineChartData = {
    labels: transactions.map((tx) => tx.date),
    datasets: [
      {
        label: 'Points Over Time',
        data: transactions.map((tx) => tx.pointsEarned),
        borderColor: '#1976D2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
      },
    ],
  };

  const handleAddPoints = () => {
    if (!billAmount) {
      toast.error('Please enter a bill amount.');
      return;
    }
    const pointsEarned = Number(billAmount) * 10;
    setTotalPoints((prevPoints) => prevPoints + pointsEarned);
    toast.success(`✅ Successfully added ${pointsEarned} points!`);
  };

  const handleRedeemPoints = () => {
    if (!pointsToRedeem) {
      toast.error('Please enter points to redeem.');
      return;
    }
    if (totalPoints >= Number(pointsToRedeem)) {
      setTotalPoints((prevPoints) => prevPoints - Number(pointsToRedeem));
      toast.success('🎉 Points redeemed successfully!');
      setRedeemModalOpen(false);
    } else {
      toast.error('❌ Insufficient points to redeem.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Section */}
      <Typography variant="h4" align="center" sx={{ color: '#3F51B5', mb: 3 }}>
        🎉 Points Dashboard
      </Typography>

      {/* Welcome Banner */}
      <Card sx={{ mb: 4, p: 3, textAlign: 'center', background: '#E3F2FD' }}>
        <Typography variant="h5" sx={{ color: '#1976D2' }}>Welcome, {localStorage.getItem("name")}!</Typography>
        <Typography variant="body1">Track your points and redeem rewards easily.</Typography>
      </Card>

      {/* Main Analytics Section */}
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {/* Total Points Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 3, background: '#FFEBEE' }}>
            <Typography variant="h5" sx={{ color: '#D32F2F' }}>Total Points</Typography>
            <Typography variant="h2" color="primary">{totalPointsEarned()}</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setRedeemModalOpen(true)}
            >
              Redeem Points
            </Button>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, background: '#E8F5E9' }}>
            <Typography variant="h6" sx={{ color: '#388E3C' }}>Points Distribution</Typography>
            <Pie data={pieChartData} options={{ maintainAspectRatio: true }} />
          </Card>
        </Grid>

        {/* Progress Bar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, background: '#FFF8E1' }}>
            <Typography variant="h6">
              Goal Progress
              <Tooltip title="Your progress towards your next reward" arrow>
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <LinearProgress variant="determinate" value={(totalPoints / 5000) * 100} sx={{ height: 10, mt: 2 }} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {5000 - totalPoints} points to unlock a ₹500 discount!
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Full-Width Charts Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, background: '#FCE4EC' }}>
            <Typography variant="h6" sx={{ color: '#C2185B' }}>Points Growth Over Time</Typography>
            <div style={{ width: '100%', height: '300px' }}>
              <Line data={lineChartData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, background: '#E1F5FE' }}>
            <Typography variant="h6" sx={{ color: '#0288D1' }}>Points Earned Per Transaction</Typography>
            <div style={{ width: '100%', height: '300px' }}>
              <Bar data={barChartData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions Section */}
      <Card sx={{ mt: 4, p: 3, background: '#FFF3E0' }}>
        <Typography variant="h5" sx={{ color: '#F57C00' }}>Recent Transactions</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {transactions.map((tx, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ background: '#FFCCBC' }}>
                <CardContent>
                  <Typography variant="body1">Date: {tx.date}</Typography>
                  <Typography variant="body1">Bill Amount: ₹{tx.billAmount}</Typography>
                  <Typography variant="body1">Points Earned: {tx.pointsEarned}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Transaction Summary Table */}
      <Card sx={{ mt: 4, p: 3, background: '#F3E5F5' }}>
        <Typography variant="h5" sx={{ color: '#7B1FA2' }}>Transaction Summary</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Bill Amount (₹)</TableCell>
              <TableCell>Points Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.billAmount}</TableCell>
                <TableCell>{tx.pointsEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

    
      {/* Redeem Points Modal */}
      <Modal open={isRedeemModalOpen} onClose={() => setRedeemModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Redeem Points
          </Typography>
          <TextField
            label="Points to Redeem"
            fullWidth
            value={pointsToRedeem}
            onChange={(e) => setPointsToRedeem(e.target.value)}
            type="number"
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRedeemPoints}
          >
            Confirm Redemption
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setRedeemModalOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EnhancedPointsDashboard;
