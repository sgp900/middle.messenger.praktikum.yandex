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

type Options = {
  method?: string;
  headers?: Object;
  data?: Object;
  timeout?: number;
};

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

export default class HTTPTransport {
  // eslint-disable-next-line no-unused-vars
  get: HTTPMethod = (url, options = {}) => {
    const { data } = options;
    if (data) {
      // eslint-disable-next-line no-param-reassign
      delete options.data;
      // eslint-disable-next-line no-param-reassign
      url += queryStringify(data);
    }

    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put: HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete: HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  // eslint-disable-next-line class-methods-use-this
  private request = (
    url: string,
    options: Options = { method: "GET" },
    timeout: number = 3000,
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

      xhr.onload = () => { resolve(xhr); };

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
