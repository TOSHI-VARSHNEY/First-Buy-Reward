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
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Chip,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [updatePropertyData, setUpdatePropertyData] = useState();
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    // Fetch properties from backend
    useEffect(() => {
        if(role==="ADMIN"){
            fetchProperties();
        }else{
            fetchMyProperties();
        }
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`/api/v1/api/v1/properties`);
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const fetchMyProperties = async () => {
        try {
            const response = await axios.get(`/api/v1/properties/user/${userId}`);
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    // Open and close Add Property popup
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleUpdate = (property) => {
        setUpdatePropertyData(property)
        setOpenUpdate(true);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/properties/${id}`);
            toast.success(`Property deleted successfully`);
            fetchProperties(); // Refresh list
        } catch (error) {
            toast.error(`Error deleting property:`);
            console.error("Error deleting property:", error);
        }
    }

    // Add property in backend (Sending FormData)
    const handleAddProperty = async (values, { resetForm, setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("location", values.location);
            formData.append("price", values.price);
            formData.append("builder", values.builder);
            formData.append("contact", values.contact);
            formData.append("discount", values.discount);
            formData.append("description", values.description);
            formData.append("features", values.features);
            
            // Append all selected files
            if (values.images && values.images.length > 0) {
                for (let i = 0; i < values.images.length; i++) {
                    formData.append("images", values.images[i]);
                }
            }

            await axios.post(`/api/v1/properties`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchProperties(); // Refresh list
            resetForm();
            handleCloseAdd();
            toast.success(`Property added successfully`);
        } catch (error) {
            toast.error(`Error adding property`);
            console.error("Error adding property:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Update property in backend (Sending FormData)
    const handleUpdateProperty = async (values, { resetForm, setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("location", values.location);
            formData.append("price", values.price);
            formData.append("builder", values.builder);
            formData.append("contact", values.contact);
            formData.append("discount", values.discount);
            formData.append("description", values.description);
            formData.append("features", values.features);
            
            // Append all selected files for update
            if (values.images && values.images.length > 0) {
                for (let i = 0; i < values.images.length; i++) {
                    formData.append("images", values.images[i]);
                }
            }

            await axios.put(`/api/v1/properties/${updatePropertyData.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchProperties(); // Refresh list
            resetForm();
            toast.success(`Property updated successfully`);
        } catch (error) {
            toast.error(`Error updating property`);
            console.error("Error updating property:", error);
        } finally {
            setSubmitting(false);
            handleCloseUpdate();
        }
    };

    // Validation Schema using Yup
    const PropertySchema = Yup.object().shape({
        name: Yup.string().required("Property name is required"),
        location: Yup.string().required("Location is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
        builder: Yup.string().required("Builder is required"),
        contact: Yup.string()
            .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
            .required("Contact is required"),
        discount: Yup.string().required("Discount is required"),
        description: Yup.string().required("Description is required"),
        features: Yup.string().required("Features are required"),
    });

    return (
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
                        Property Management
                    </Typography>
                    <Button variant="contained" onClick={handleOpenAdd}>
                        Add Property
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.light" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Property Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Builder</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Contact</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Discount</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Images</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {properties.map((property) => (
                                <TableRow key={property.id}>
                                    <TableCell>{property.name}</TableCell>
                                    <TableCell>{property.location}</TableCell>
                                    <TableCell>{property.price}</TableCell>
                                    <TableCell>{property.builder}</TableCell>
                                    <TableCell>{property.contact}</TableCell>
                                    <TableCell>{property.discount}</TableCell>
                                    <TableCell>
                                        {property.images && property.images.length > 0 ? (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {property.images.map((img, index) => (
                                                    <Chip 
                                                        key={index} 
                                                        label={`Image ${index + 1}`} 
                                                        size="small" 
                                                        onClick={() => window.open(img.url, '_blank')}
                                                    />
                                                ))}
                                            </Box>
                                        ) : 'No images'}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" size="small" sx={{ mr: 1 }} onClick={()=> handleUpdate(property)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={()=> handleDelete(property.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* Add Property Popup */}
            <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
                <DialogTitle>Add New Property</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: "",
                            location: "",
                            price: "",
                            builder: "",
                            contact: "",
                            discount: "",
                            description: "",
                            features: "",
                            images: [],
                        }}
                        validationSchema={PropertySchema}
                        onSubmit={handleAddProperty}
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>
                                <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
                                    <Field as={TextField} label="Property Name" name="name" fullWidth error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
                                    <Field as={TextField} label="Location" name="location" fullWidth error={touched.location && !!errors.location} helperText={touched.location && errors.location} />
                                    <Field as={TextField} label="Price" name="price" fullWidth error={touched.price && !!errors.price} helperText={touched.price && errors.price} />
                                    <Field as={TextField} label="Builder" name="builder" fullWidth error={touched.builder && !!errors.builder} helperText={touched.builder && errors.builder} />
                                    <Field as={TextField} label="Contact" name="contact" fullWidth error={touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
                                    <Field as={TextField} label="Discount" name="discount" fullWidth error={touched.discount && !!errors.discount} helperText={touched.discount && errors.discount} />
                                    <Field as={TextField} label="Description" name="description" fullWidth error={touched.description && !!errors.description} helperText={touched.description && errors.description} />
                                    <Field as={TextField} label="Features" name="features" fullWidth error={touched.features && !!errors.features} helperText={touched.features && errors.features} />

                                    {/* Multiple File Input */}
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={(event) => {
                                            setFieldValue("images", Array.from(event.currentTarget.files));
                                        }}
                                    />
                                    {values.images && values.images.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                            {Array.from(values.images).map((file, index) => (
                                                <Chip 
                                                    key={index} 
                                                    label={file.name} 
                                                    size="small" 
                                                    onDelete={() => {
                                                        const newFiles = [...values.images];
                                                        newFiles.splice(index, 1);
                                                        setFieldValue("images", newFiles);
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    {errors.images && touched.images && <div style={{ color: "red" }}>{errors.images}</div>}
                                </Box>
                                <DialogActions>
                                    <Button onClick={handleCloseAdd} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained">
                                        Add
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            {/* Update Property Popup */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                <DialogTitle>Update Property</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: updatePropertyData?.name || "",
                            location: updatePropertyData?.location || "",
                            price: updatePropertyData?.price || "",
                            builder: updatePropertyData?.builder || "",
                            contact: updatePropertyData?.contact || "",
                            discount: updatePropertyData?.discount || "",
                            description: updatePropertyData?.description || "",
                            features: updatePropertyData?.features || "",
                            images: [],
                            existingImages: updatePropertyData?.images || [],
                        }}
                        validationSchema={PropertySchema}
                        onSubmit={handleUpdateProperty}
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>
                                <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
                                    <Field as={TextField} label="Property Name" name="name" fullWidth error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
                                    <Field as={TextField} label="Location" name="location" fullWidth error={touched.location && !!errors.location} helperText={touched.location && errors.location} />
                                    <Field as={TextField} label="Price" name="price" fullWidth error={touched.price && !!errors.price} helperText={touched.price && errors.price} />
                                    <Field as={TextField} label="Builder" name="builder" fullWidth error={touched.builder && !!errors.builder} helperText={touched.builder && errors.builder} />
                                    <Field as={TextField} label="Contact" name="contact" fullWidth error={touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
                                    <Field as={TextField} label="Discount" name="discount" fullWidth error={touched.discount && !!errors.discount} helperText={touched.discount && errors.discount} />
                                    <Field as={TextField} label="Description" name="description" fullWidth error={touched.description && !!errors.description} helperText={touched.description && errors.description} />
                                    <Field as={TextField} label="Features" name="features" fullWidth error={touched.features && !!errors.features} helperText={touched.features && errors.features} />

                                    {/* Display existing images */}
                                    {values.existingImages && values.existingImages.length > 0 && (
                                        <Box>
                                            <Typography variant="subtitle2">Existing Images:</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                {values.existingImages.map((img, index) => (
                                                    <Chip 
                                                        key={`existing-${index}`} 
                                                        label={`Image ${index + 1}`} 
                                                        size="small" 
                                                        onClick={() => window.open(img.url, '_blank')}
                                                        onDelete={() => {
                                                            // You might want to implement a way to mark images for deletion
                                                            // This would require backend support
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Multiple File Input for new images */}
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={(event) => {
                                            setFieldValue("images", Array.from(event.currentTarget.files));
                                        }}
                                    />
                                    {values.images && values.images.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                            {Array.from(values.images).map((file, index) => (
                                                <Chip 
                                                    key={index} 
                                                    label={file.name} 
                                                    size="small" 
                                                    onDelete={() => {
                                                        const newFiles = [...values.images];
                                                        newFiles.splice(index, 1);
                                                        setFieldValue("images", newFiles);
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                                <DialogActions>
                                    <Button onClick={handleCloseUpdate} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained">
                                        Update
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default PropertyManagement;