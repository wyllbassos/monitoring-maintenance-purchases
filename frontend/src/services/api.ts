import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.1.103:3333',
  //baseURL: 'http://localhost:3333',
  baseURL: 'http://glo-01-0443:3333',
});

export default api;