import axios from 'axios';
import { baseURL } from '../env.json';

console.log(baseURL);

const api = axios.create({
  baseURL,
  // baseURL: 'http://localhost:3333',
  // baseURL: 'http://glo-01-0443:3333',
  // baseURL: 'http://172.16.104.252:3333',
});

export default api;
