import { expect } from "chai";
import sinon from "sinon";
import proxyquire from "proxyquire";
import router from "./router";
import { Block } from "./block";

describe("Router", () => {
  const oliginalForvard = window.history.forward;
  const oliginalBack = window.history.back;

  const fakeRender = sinon.fake();
  const fakeConstructor = sinon.fake();

  const host = "http://localhost:3000";
  const path = "/path";

  class fakeRoute {
    constructor() {
      fakeConstructor();
    }

    render = fakeRender;

    match = (pathname: string) => pathname === "/path";
  }

  let fakeRouter: typeof router;

  beforeEach(() => {
    router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();

    fakeRouter = proxyquire("./router", {
      "./route": {
        Route: fakeRoute,
      },
    }).default;
  });

  before(() => {
    // @ts-ignore
    global.dom.reconfigure({ url: `${host}${path}` });
  });

  after(() => {
    window.history.forward = oliginalForvard;
    window.history.back = oliginalBack;

    // @ts-ignore
    global.dom.reconfigure({ url: `${host}` });
  });

  it("forward", () => {
    router.forward();
    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it("back", () => {
    router.back();
    expect((window.history.back as any).callCount).to.eq(1);
  });

  it("use - add new route", () => {
    fakeRouter.use(path, Block);

    expect(fakeConstructor.callCount).to.be.eq(1);
  });

  it("register onpopstate when start", () => {
    // eslint-disable-next-line no-unused-expressions
    expect(window.onpopstate).is.null;

    router.start(true);

    expect(window.onpopstate).is.a("function");
  });

  it("call route.render method when start with initOnly flag false", () => {
    fakeRouter.use(path, Block);
    fakeRouter.start();

    expect(fakeRender.callCount).to.be.eq(1);
  });
});
