const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method?: METHODS;
  headers?: Record<string, string>;
  data?: Object;
  timeout?: number;
};

type HTTPMethod = <Response = void>(
  url: string,
  options?: Options
) => Promise<Response>;

class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path = "/") => this.request(this.endpoint + path);

  public post: HTTPMethod = (path, options = { method: METHODS.POST }) =>
    this.request(this.endpoint + path, {
      ...options,
      method: METHODS.POST,
    });

  public put: HTTPMethod = (path, options = { method: METHODS.PUT }) =>
    this.request(this.endpoint + path, {
      ...options,
      method: METHODS.PUT,
    });

  public patch: HTTPMethod = (path, options = { method: METHODS.PATCH }) =>
    this.request(this.endpoint + path, {
      ...options,
      method: METHODS.PATCH,
    });

  public delete: HTTPMethod = (path, options = { method: METHODS.DELETE }) =>
    this.request(this.endpoint + path, {
      ...options,
      method: METHODS.DELETE,
    });

  private request: HTTPMethod = (url, options = { method: METHODS.GET }) => {
    const { method } = options;
    let { data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as METHODS, url);

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

      let sendData: FormData | string;

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
        data = JSON.stringify(data) as string;
        sendData = data as string;
      } else {
        sendData = data as FormData;
      }

      if (method === METHODS.GET && url.match(/(.png|.jpg)$/)) {
        xhr.responseType = "blob";
      } else {
        xhr.responseType = "json";
      }

      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(sendData);
      }
    });
  };
}

export { HTTPTransport };
