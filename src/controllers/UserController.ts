import { User } from "../interfaces/interface";
import { UserAPI } from "../api/UserAPI";
import store from "../utils/store";
import router from "../utils/router";
import ResourcesController from "./ResourcesController";

class UserController {
  private readonly api = new UserAPI();

  async request(req: () => void) {
    try {
      await req();
      store.set("profile.error", undefined);
    } catch (e: any) {
      store.set("profile.error", e.reason);
    }
  }

  async editProfile(data: User) {
    await this.request(async () => {
      const user = await this.api.profile(data);

      store.set("user.data", user);
      router.go("/profile");
    });
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    if (newPassword !== confirmPassword) {
      store.set("profile.localError", "Пароли должны совпадать");
      return;
    }

    store.set("profile.localError", undefined);

    await this.request(async () => {
      await this.api.password(oldPassword, newPassword);
      router.go("/profile");
    });
  }

  async avatar(formData: FormData) {
    await this.request(async () => {
      const user: User = await this.api.avatar(formData);
      store.set("user.data.avatar", user.avatar);
      ResourcesController.getAvatar(user.avatar as string);
    });
  }

  async search(login: string): Promise<User[]> {
    const user: User[] = await this.api.search(login);
    return user;
  }
}

export default new UserController();
