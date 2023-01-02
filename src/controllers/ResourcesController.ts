import { ResourcesAPI } from "../api/ResourcesAPI";
import store from "../utils/store";

class ResourcesController {
  private readonly api = new ResourcesAPI();

  async getAvatar(path: string) {
    const res = (await this.api.read(path)) as Blob;

    store.set("user.data.avatarSrc", URL.createObjectURL(res));
  }
}

export default new ResourcesController();
