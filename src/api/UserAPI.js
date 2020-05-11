import API from './API';

class UserAPI extends API {
  signUp = user => this.post('auth/signup', user);

  signIn = user => this.post('auth/signin', user);

  getActiveDetectiveCases = userId =>
    this.get(`user/activeDetectiveCases/${userId}`);

  getCreatedeDetectiveCases = userId =>
    this.get(`user/createdDetectiveCases/${userId}`);
}

export default UserAPI;
