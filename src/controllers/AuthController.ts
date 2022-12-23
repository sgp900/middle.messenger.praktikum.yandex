import { AuthAPI } from "../api/AuthAPI";
import { SigninData, SignupData } from "../interfaces/interface";
import store from "../utils/store";
import router from "../utils/router";
import messagesController from "./MessagesController";

class AuthController {
  private readonly api = new AuthAPI();

  async request(req: () => void) {
    store.set("user.isLoading", true);
    try {
      await req();
      store.set("user.error", undefined);
    } catch (e: any) {
      store.set("user.error", e.reason);
    } finally {
      store.set("user.isLoading", true);
    }
  }

  async signin(data: SigninData) {
    await this.request(async () => {
      await this.api.signin(data);
      this.fetchUser();
      router.go("/messenger");
    });
  }

  async signup(data: SignupData) {
    await this.request(async () => {
      await this.api.signup(data);
      await this.fetchUser();
      router.go("/messenger");
    });
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set("user.data", user);
  }

  async logout() {
    await this.request(async () => {
      await this.api.logout();

      messagesController.closeAll();

      router.go("/");
    });
  }
}

export default new AuthController();
