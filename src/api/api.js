import axios from 'axios';

let base = '';
axios.defaults.baseURL = '';
axios.defaults.timeout = 20000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const requestLogin=params=>{return axios.post(`${base}/login`,params).then(res=>res.data)}

export const requestUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
