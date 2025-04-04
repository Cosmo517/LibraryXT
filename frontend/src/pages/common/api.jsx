import axios from 'axios'

// creates the API for the frontend to use
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // the port the API is running on... (aka FastAPI)
});

export default api