import axios from 'axios';

const apiURL = 'http://localhost:5000/api/';

const token = localStorage.getItem('token');
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

console.log(token);
class UserAPI {
  signUp = user => axios.post(apiURL + 'auth/signup', user);
  signIn = user => axios.post(apiURL + 'auth/signin', user);
  getActiveDetectiveCases = userId =>
    axios.get(apiURL + `user/activeDetectiveCases/${userId}`);
}

export default UserAPI;
