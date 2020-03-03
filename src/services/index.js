import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_ADDRESS;
const tokens = localStorage.getItem('tokens') || sessionStorage.getItem('tokens');
if (tokens) {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(tokens).access
}
axios.defaults.baseURL = baseUrl

export default axios
