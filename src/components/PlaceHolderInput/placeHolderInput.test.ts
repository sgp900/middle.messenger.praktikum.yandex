import { expect } from "chai";
import sinon from "sinon";
import { PlaceHolderInput } from "./placeHolderInput";

const testString = "test string";
let fakeRender = sinon.fake();

class FakePlaceHolderInput extends PlaceHolderInput {
  render(): DocumentFragment {
    fakeRender();
    return new DocumentFragment();
  }
}

describe("placeHolderInput Component", () => {
  beforeEach(() => {
    fakeRender = sinon.fake();
  });

  it("should set new value of input field", () => {
    const input = new PlaceHolderInput();

    input.setValue(testString);

    expect(input.element!.querySelector("input")!.value).to.be.eq(testString);
  });

  it("should get value of input field", () => {
    const input = new PlaceHolderInput({
      name: "test",
      value: testString,
    });

    expect(input.getValue()).to.be.eq(testString);
  });

  it("should re-render if props error is changed", () => {
    const fakeInput = new FakePlaceHolderInput({
      name: "test",
      value: "string",
    });

    expect(fakeRender.callCount).to.be.eq(1);

    fakeInput.props.error = "string";
    expect(fakeRender.callCount).to.be.eq(2);
  });

  it("should not re-render if another props are changehd", () => {
    const fakeInput = new FakePlaceHolderInput({
      name: "test",
      value: "string",
    });

    expect(fakeRender.callCount).to.be.eq(1);

    fakeInput.props.value = "long string";
    expect(fakeRender.callCount).to.be.eq(1);
  });
});
