import { myFetch } from "./fetch.config.js";

class UserService {
  /** uses the 'x-auth-token' header taken from the cookie 'TodoLogin' */
  static async getInfo() {
    const res = await myFetch("GET", "/user/info");
    return res;
  }



  /** data must be equal {email :str, password :str} */
  static async login(data) {
    const res = await myFetch("POST", "/user/login", { 
      body: data,
    });
    return res;
  }



  /** data must be equal {name, email, password} */
  static async register(data) {
    const res = await myFetch("POST", "/user/register", { 
      body: data,
    });
    return res;
  }
}


export default UserService;