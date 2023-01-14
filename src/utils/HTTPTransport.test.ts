import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { expect } from "chai";
import { HTTPTransport } from "./HTTPTransport";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("/auth");
  });

  afterEach(() => {
    requests.length = 0;
  });

  it(".get() should send GET request", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });

  it(".post() should send POST request", () => {
    instance.post("/user");

    const [request] = requests;

    expect(request.method).to.eq("POST");
  });

  it(".post() should send data to server", () => {
    instance.post("/user", { data: { user: "vasa" } });

    const [request] = requests;

    expect(JSON.parse(request.requestBody).user).to.be.eq("vasa");
  });

  it(".put() should send PUT request", () => {
    instance.put("/user");

    const [request] = requests;

    expect(request.method).to.eq("PUT");
  });

  it(".patch() should send PATCH request", () => {
    instance.patch("/user");

    const [request] = requests;

    expect(request.method).to.eq("PATCH");
  });

  it(".delete() should send DELETE request", () => {
    instance.delete("/user");

    const [request] = requests;

    expect(request.method).to.eq("DELETE");
  });
});