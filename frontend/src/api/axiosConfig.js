import axios from 'axios';

export default axios.create({
    baseURL: 'https://b278c387e12d.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});