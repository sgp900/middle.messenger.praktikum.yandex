export enum Method {
  Get = "Get",
  Post = "Post",
  Put = "Put",
  Patch = "Patch",
  Delete = "Delete",
}

type Options = {
  method: Method;
  data?: any;
};

class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = "/"): Promise<Response> {
    console.log(this.endpoint + path);

    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(
    path: string,
    data?: unknown
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(
    path: string,
    data: unknown
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response = void>(
    path: string,
    data: unknown
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(
    url: string,
    options: Options = { method: Method.Get }
  ): Promise<Response> {
    const { method } = options;
    let { data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(new Error("abort"));
      xhr.onerror = () => reject(new Error("network error"));
      xhr.ontimeout = () => reject(new Error("timeout"));

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
        data = JSON.stringify(data);
      }
      if (method === Method.Get && url.match(/(.png|.jpg)$/)) {
        xhr.responseType = "blob";
      } else {
        xhr.responseType = "json";
      }

      xhr.withCredentials = true;

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export { HTTPTransport };
