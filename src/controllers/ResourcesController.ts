import { ResourcesAPI } from "../api/ResourcesAPI";
import store from "../utils/store";

class ResourcesController {
  private readonly api = new ResourcesAPI();

  async getAvatar(path: string) {
    if (path.length > 0) {
      try {
        const res = (await this.api.read(path)) as Blob;
        store.set("user.data.avatarSrc", URL.createObjectURL(res));
      } catch {
        store.set("user.data.avatarSrc", "");
      }
    }
  }
}

export default new ResourcesController();
