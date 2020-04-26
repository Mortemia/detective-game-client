import axios from 'axios';

const apiURL = 'http://localhost:5000/api/auth/';

class UserAPI {
  signUp = (user) => axios.post(apiURL + 'signup', user);
  signIn = (user) => axios.post(apiURL + 'signin', user);
}

export default UserAPI;
