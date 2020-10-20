import axios from 'axios';

const _URL = 'http://localhost';
const _PORT = '3333';

const api = axios.create({
  baseURL: `${_URL}:${_PORT}`
});

export default api;