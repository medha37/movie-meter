import axios from 'axios';

export default axios.create({
    baseURL: 'https://6ca85b502ff1.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});