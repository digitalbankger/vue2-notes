import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ email, password }) {
    return api
      .post("/auth", {
        email,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ email, password, confirm_password }) {
    return api.post("/reg", {
      email,
      password,
      confirm_password
    });
  }
}

export default new AuthService();
