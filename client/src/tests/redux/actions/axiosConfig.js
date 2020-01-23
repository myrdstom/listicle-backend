import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://listicle-backend.herokuapp.com/api',
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
//
// instance.interceptors.request.use((config) => {
//     // eslint-disable-next-line
//     config.headers['Authorization'] = localStorage.getItem('token');
//     return config;
// });

export default instance;
