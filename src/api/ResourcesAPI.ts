import BaseAPI from "./BaseAPI";

export class ResourcesAPI extends BaseAPI {
  constructor() {
    super("/resources");
  }

  read(path: string): Promise<Blob> {
    return this.http.get(path);
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
