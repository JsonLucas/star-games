import axios from 'axios';

//const axiosInstance = axios.create({baseURL: 'http://localhost:5000'});
const axiosInstance = axios.create({baseURL: 'https://star-games-jsonlucas.herokuapp.com'});
export default axiosInstance;