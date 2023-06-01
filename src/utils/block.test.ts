import { expect } from "chai";
import sinon from "sinon";
import proxyquire from "proxyquire";
import type { Block as BlockType } from "./block";

let eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { Block } = proxyquire("./block", {
  "./eventBus": {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { Block: typeof BlockType };

class ComponentMock extends Block {
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected init(): void {
    this.children.child = new ComponentMock();
  }
}

describe("Block", () => {
  beforeEach(() => {
    eventBusMock = {
      on: sinon.fake(),
      emit: sinon.fake(),
    };
  });

  it("should fire init event on initialization", () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith("init")).to.eq(true);
  });

  it("should init component-did-update event if props are changed", () => {
    const mockComponent = new ComponentMock({});
    mockComponent.setProps({ testProp: "test value" });

    expect(eventBusMock.emit.calledWith("flow:component-did-update")).to.eq(
      true
    );
  });

  it("should set props value", () => {
    const value = "test value";
    const mockComponent = new ComponentMock({});
    mockComponent.setProps({ testProp: value });

    expect(mockComponent.props.testProp).to.eq(value);
  });

  it("should init component-unmount event for component and his childrens", () => {
    const mockComponent = new ComponentMock({});

    mockComponent.dispatchComponentWillUnmount();

    expect(eventBusMock.emit.callCount).to.be.eq(2);
  });
});
