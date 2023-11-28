import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

class UserService {
  async registration(email: string, password : string) {
    const {data} = await $host.post('api/user/registration',
      {
        email,
        password,
        role: 'ADMIN'
      }
    );
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
  }

  async login(email : string, password : string) {
    const {data} = await $host.post('api/user/login',
      {
        email,
        password
      }
    );
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
  }

  async check() {
    try { 
      const {data} = await $authHost.get('api/user/auth');
      localStorage.setItem('token', data.token);
      return jwt_decode(data.token);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserService()