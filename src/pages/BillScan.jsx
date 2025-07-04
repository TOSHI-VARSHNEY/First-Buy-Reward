// Import required libraries
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, CircularProgress, Card, CardContent, LinearProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from '../config/AxiosInterceptor';
import { toast } from 'react-toastify';
import { numberToWords } from './../utils/numberToWords';

const BillScanPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ocrResult, setOcrResult] = useState(null);
    const [error, setError] = useState('');

    const onDrop = (acceptedFiles, rejectedFiles) => {
        setError('');
        
        if (rejectedFiles && rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            if (rejectedFile.errors[0].code === 'file-invalid-type') {
                setError('Only PDF files are accepted');
            } else if (rejectedFile.errors[0].code === 'too-many-files') {
                setError('Only one file can be uploaded at a time');
            }
            return;
        }

        setFile(acceptedFiles[0]);
        setProgress(0);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        multiple: false
    });

    const handleScan = async () => {
        if (!file) {
            toast.error('Please upload a bill to scan!');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('bill', file);
            const response = await axios.post('/api/v1/bill-scan-ocr/scan-bill', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                }
            });
            setOcrResult(response.data);
            toast.success('File scanned successfully');
        } catch (error) {
            const errorMessage =
                error.response?.data?.errorMessage || 'An error occurred during scanning';
            toast.error(errorMessage);
            console.error('Scan error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh', mt: 8 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={3} sx={{ p: 3, maxWidth: 700, margin: '0 auto' }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Scan Your Bill
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            {...getRootProps()}
                            sx={{
                                p: 3,
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                bgcolor: '#fafafa',
                                height: "180px",
                                borderColor: error ? 'error.main' : '#ccc'
                            }}
                        >
                            <input {...getInputProps()} />

                            <CloudUploadIcon fontSize="large" color={error ? "error" : "primary"} />
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Drag & drop your bill here, or click to upload
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: error ? 'error.main' : 'text.secondary' }}>
                                {error || 'Only PDF files are accepted'}
                            </Typography>
                        </Box>

                        {file && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Selected File: {file.name}
                            </Typography>
                        )}

                        {loading && (
                            <Box sx={{ mt: 3 }}>
                                <LinearProgress variant="determinate" value={progress} />
                                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                                    Uploading... {progress}%
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3, py: 1.5 }}
                            onClick={handleScan}
                            disabled={loading || !file}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Scan Bill'}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    {ocrResult && (
                        <Card elevation={3} sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Invoice Summary
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom><strong>Invoice Number:</strong> {ocrResult.invoiceNumber}</Typography>
                                    <Typography variant="subtitle1" gutterBottom><strong>Invoice Date:</strong> {ocrResult.invoiceDate}</Typography>
                                    <Typography variant="subtitle1" gutterBottom><strong>Seller:</strong> {ocrResult.seller}</Typography>
                                    <Typography variant="subtitle1" gutterBottom><strong>Address:</strong></Typography>
                                    <Typography variant="body2" gutterBottom>{ocrResult.address}</Typography>
                                    <Typography variant="subtitle1" gutterBottom><strong>Amount:</strong></Typography>
                                    <Typography variant="body2">{ocrResult.amount}</Typography>
                                    <Typography variant="body2" gutterBottom>{numberToWords(ocrResult.amount)}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default BillScanPage;