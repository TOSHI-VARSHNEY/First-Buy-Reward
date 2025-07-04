import axios from 'axios';

// Create an instance of Axios
const localBaseUrl = "http://localhost:8080"
const api = axios.create({
  baseURL: "https://first-buy.in/",
  // baseURL: localBaseUrl
});

// Add interceptors for handling FormData and JSON requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Dynamically set Content-Type based on data type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;