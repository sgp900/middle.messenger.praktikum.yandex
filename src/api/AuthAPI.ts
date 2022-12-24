import BaseAPI from "./BaseAPI";
import { User, SigninData, SignupData } from "../interfaces/interface";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signin(data: SigninData) {
    return this.http.post("/signin", { data });
  }

  signup(data: SignupData) {
    return this.http.post("/signup", { data });
  }

  read(): Promise<User> {
    return this.http.get<User>("/user");
  }

  logout() {
    return this.http.post("/logout");
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
