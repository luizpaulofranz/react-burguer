import axios from 'axios';

// separated instance of axios, with its own configurations.
const instance = axios.create({
    baseURL: 'https://study-react-burger.firebaseio.com/'
});

export default instance;