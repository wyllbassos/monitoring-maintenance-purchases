import axios from 'axios';
import { baseURL } from '../env.json';

const api = axios.create({
  baseURL: baseURL + ':3333',
  // baseURL: 'http://localhost:3333',
  // baseURL: 'http://glo-01-0443:3333',
  // baseURL: 'http://172.16.104.252:3333',
});

export const apiSS = axios.create({
  baseURL: baseURL + ':3335', //'http://glo-01-0443:3335',
  // baseURL: 'http://localhost:3333',
  // baseURL: 'http://glo-01-0443:3333',
  // baseURL: 'http://172.16.104.252:3333',
});

export default api;
