import axios from 'axios';
import Cookie from 'js-cookie';

const apiURL = 'http://localhost:5000/api/';

const token = Cookie.get('token');
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
class UserAPI {
  signUp = user => axios.post(apiURL + 'auth/signup', user);
  signIn = user => axios.post(apiURL + 'auth/signin', user);
  getActiveDetectiveCases = userId =>
    axios.get(apiURL + `user/activeDetectiveCases/${userId}`).catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.href = 'http://localhost:3000/login';
      }
    });
}

export default UserAPI;
