function queryStringify(data: Object) {
  let ret = "?";
  Object.entries(data).forEach(([key, value], index, array) => {
    ret += `${key}=${value}`;
    if (index !== array.length - 1) {
      ret += "&";
    }
  });
  return ret;
}

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Options = {
  method?: METHODS;
  headers?: Record<string, string>;
  data?: Object;
  timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const { data } = options;
    if (data) {
      delete options.data;
      url += queryStringify(data);
    }

    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  private request = (
    url: string,
    options: Options = { method: METHODS.GET },
    timeout: number = 3000
  ) => {
    const { method, headers, data } = options;

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open(method as string, url, true);
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
