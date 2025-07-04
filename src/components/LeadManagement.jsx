import { useEffect, useState } from "react";
import {
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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar
} from "@mui/material";
import axios from "../config/AxiosInterceptor";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`/api/v1/leads/all`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
  };

  return (
    <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Lead Management
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "secondary.light" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Property</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads?.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.user?.name}</TableCell>
                  <TableCell>{lead.user?.email}</TableCell>
                  <TableCell>{lead.property?.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewLead(lead)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Lead Details Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}>
          Lead Details
        </DialogTitle>
        <DialogContent>
          {selectedLead && (
            <Grid container spacing={3} sx={{ p: 2 }}>
              {/* Left Side - User & Property Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  User Information:
                </Typography>
                <Typography><strong>Name:</strong> {selectedLead.user?.name}</Typography>
                <Typography><strong>Email:</strong> {selectedLead.user?.email}</Typography>
                <Typography><strong>Phone:</strong> {selectedLead.user?.phoneNumber}</Typography>
                <Typography><strong>Role:</strong> {selectedLead.user?.role}</Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
                  Property Information:
                </Typography>
                <Typography><strong>Name:</strong> {selectedLead.property?.name}</Typography>
                <Typography><strong>Location:</strong> {selectedLead.property?.location}</Typography>
                <Typography><strong>Builder:</strong> {selectedLead.property?.builder}</Typography>
                <Typography><strong>Price:</strong> ₹{selectedLead.property?.price.toLocaleString()}</Typography>
                <Typography><strong>Discount:</strong> {selectedLead.property?.discount}%</Typography>

                {selectedLead.property?.features?.length > 0 && (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                      Features:
                    </Typography>
                    <ul>
                      {selectedLead.property.features.map((feature, index) => (
                        <li key={index}>{feature.replace(/'/g, "")}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Grid>

              {/* Right Side - Property Image */}
              <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedLead.property?.image && (
                  <Avatar
                    variant="rounded"
                    src={`data:image/jpeg;base64,${selectedLead.property.image}`}
                    alt={selectedLead.property.name}
                    sx={{ width: 250, height: 180, borderRadius: "10px", boxShadow: 3 }}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default LeadManagement;
