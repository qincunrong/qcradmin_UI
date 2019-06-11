import axios from 'axios';

let base = '';
axios.defaults.baseURL = '';
axios.defaults.timeout = 20000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const requestLogin=params=>{return axios.post(`${base}/login`,params).then(res=>res.data)}


