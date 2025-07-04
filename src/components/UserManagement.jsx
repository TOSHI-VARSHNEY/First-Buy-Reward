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

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/v1/users/all`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/users/${id}`);
            toast.success(`User deleted successfully`);
            fetchUsers(); // Refresh list
        } catch (error) {
            toast.success(`Error deleting user:`);
            console.error("Error deleting user:", error);
        }
    }

    return (
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
                        User Management
                    </Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.light" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Id</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Phone Number</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Points Balance</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.pointsBalance}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" size="small" onClick={()=> handleDelete(user.id)}>
                                            Delete
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

export default UserManagement;
