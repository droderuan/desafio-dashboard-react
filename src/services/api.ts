import axios from 'axios';

const api = axios.create({
  baseURL: 'https://desafio-tractian-ruan.herokuapp.com/',
});
export default api;
