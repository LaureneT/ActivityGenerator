// src/api.js
// client-side utility

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Update this if your Express.js server runs on a different port
});

export default instance;
