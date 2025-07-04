import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";


const ReceiptManagement = () => {
    const [receipts, setReceipts] = useState([]);

    // Fetch receipts from backend
    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        try {
            const response = await axios.get(`/api/v1/bill-scan-ocr/all`);
            setReceipts(response.data);
        } catch (error) {
            console.error("Error fetching receipts:", error);
        }
    };

    const handleVerify = async (id) => {
        try {
            await axios.put(`/api/v1/bill-scan-ocr/verify-receipt/${id}`);
            toast.success(`Receipt verified successfully`);
            fetchReceipts(); 
        } catch (error) {
            toast.success(`Error verifying receipt:`);
            console.error("Error verifying receipt:", error);
        }
    }

    return (
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
                        Receipt Management
                    </Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.light" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Id</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Receipt Number</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receipts?.map((receipt) => (
                                <TableRow key={receipt.id}>
                                    <TableCell>{receipt.id}</TableCell>
                                    <TableCell>{receipt?.invoiceNumber}</TableCell>
                                    <TableCell>{receipt.address}</TableCell>
                                    <TableCell>{receipt.amount}</TableCell>
                                    <TableCell>{receipt.invoiceDate}</TableCell>
                                    <TableCell>{receipt.status}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" size="small" onClick={()=> handleVerify(receipt.id)}>
                                            Verify
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ReceiptManagement;
