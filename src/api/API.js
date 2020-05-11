import axios from 'axios';
import Cookie from 'js-cookie';

const apiURL = 'http://localhost:5000/api/';

export const setAuthToken = () => {
  const token = Cookie.get('token');
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

class API {
  get = url => axios.get(`${apiURL}${url}`);
  post = (url, body) => axios.post(`${apiURL}${url}`, body);
  put = (url, body) => axios.put(`${apiURL}${url}`, body);
  delete = (url, body) => axios.delete(`${apiURL}${url}`, { data: body });
}

export default API;
