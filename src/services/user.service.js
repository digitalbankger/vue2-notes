import api from './api';

class UserService {

  getUserInfo() {
    return api.get('/auth');
  }

  getModeratorInfo() {
    return api.get('/mod');
  }

  getAdminInfo() {
    return api.get('/admin');
  }
}

export default new UserService();
