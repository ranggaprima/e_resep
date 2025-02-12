import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '10.250.111.15:8006', // Set your base URL here
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'; // Allow all origins
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
