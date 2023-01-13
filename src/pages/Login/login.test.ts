import { expect } from "chai";

import proxyquire from "proxyquire";
import sinon from "sinon";
import type { Login as LoginType } from "./login";

describe("Login Page", () => {
  const signinFake = sinon.fake();

  let element: HTMLElement | null = null;

  beforeEach(() => {
    const { Login } = proxyquire("./login", {
      "../../controllers/AuthController": {
        signin: signinFake,
        "@noCallThru": true,
      },
    });
    const page: LoginType = new Login();
    element = page.element;
  });

  it("should call AuthController signin an auth button click", () => {
    const button = element?.querySelector("button");
    const login = element!.querySelector("#login");
    const password = element!.querySelector("#password");

    (login as HTMLInputElement).value = "type41";
    (password as HTMLInputElement).value = "Type1234";

    button?.click();

    expect((signinFake as any).callCount).to.eq(1);
  });

  it("should show error msg if login or password are empty", () => {
    const button = element?.querySelector("button");
    const login = element!.querySelector("#login");
    const password = element!.querySelector("#password");

    (login as HTMLInputElement).value = "";
    (password as HTMLInputElement).value = "";

    button?.click();

    const inputError = element!.querySelector(".placeHolderInput__error");
    expect(inputError?.textContent?.length).to.be.at.least(1);
  });
});
