import axios from 'axios';

// definir a base url
export const api = axios.create({
    baseURL: 'http://localhost:3333/'
})