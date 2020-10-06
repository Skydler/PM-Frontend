import axios from 'axios';


export function setTokens() {
    const tokens = localStorage.getItem('tokens') || sessionStorage.getItem('tokens');
    if (tokens) {
        axios.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(tokens).access
    }
}

const baseUrl = process.env.REACT_APP_SERVER_ADDRESS;
axios.defaults.baseURL = baseUrl;
setTokens();

export default axios
