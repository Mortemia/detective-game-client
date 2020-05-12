import axios from 'axios';
import Cookie from 'js-cookie';

const apiURL = 'http://localhost:5000/api';

const axiosInstance = axios.default.create({ baseURL: apiURL });
axiosInstance.interceptors.request.use(async configuration => {
  const token = Cookie.get('token');
  if (token) configuration.headers.Authorization = `Bearer ${token}`;
  return configuration;
});

class API {
  get = url => axiosInstance.get(url);
  post = (url, body) => axiosInstance.post(url, body);
  put = (url, body) => axiosInstance.put(url, body);
  delete = (url, body) => axiosInstance.delete(url, { data: body });
}

export default API;
