import axios from 'axios';

export default axios.create({
    baseURL: 'https://9c884f97b6e1.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});