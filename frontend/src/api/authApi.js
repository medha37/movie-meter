import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api/v1' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (payload) => API.post('/auth/login', payload);
export const register = (payload) => API.post('/auth/register', payload);
export const addToWatchList = (imdbId) => API.post(`/watchlist/${imdbId}`);
export const getWatchList = () => API.get(`/watchlist`);