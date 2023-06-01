import { expect } from "chai";
import Sinon from "sinon";
import { BaseLink as Link } from "./link";

describe("Link Component", () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: Sinon.fake(),
    };
  });

  it("should call Router go on click", () => {
    const instance = new Link({
      label: "click me",
      href: "/asd",
      router: routerMock as any,
    });
    const { element } = instance;

    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  });

  it("should call Router go on click with link href", () => {
    const path = "/asd";

    const instance = new Link({
      label: "click me",
      href: path,
      router: routerMock as any,
    });
    const { element } = instance;

    element?.click();

    expect(routerMock.go.firstArg).to.eq(path);
  });
});
