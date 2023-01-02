import BaseAPI from "./BaseAPI";
import { User } from "../interfaces/interface";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  read(id: string) {
    return this.http.get(id);
  }

  profile(data: User) {
    return this.http.put("/profile", { data });
  }

  password(oldPassword: string, newPassword: string) {
    return this.http.put("/password", { data: { oldPassword, newPassword } });
  }

  avatar(file: FormData): Promise<User> {
    return this.http.put("/profile/avatar", { data: file });
  }

  search(login: string): Promise<User[]> {
    return this.http.post("/search", { data: { login } });
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
