import { nanoid } from "nanoid";
import { EventBus } from "./eventBus";

type BlockEvents<P = any> = {
  init: [];
  "flow:component-did-mount": [];
  "flow:component-did-update": [P, P];
  "flow:component-was-update": [];
  "flow:render": [];
};

type Props<P extends Record<string, any> = any> = {
  events?: Record<string, (e?: Event) => void>;
} & P;

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-was-update",
  } as const;

  public id = nanoid(6);

  public props: Props<P>;

  // eslint-disable-next-line no-use-before-define
  public children: Record<string, Block | Block[]> = {};

  private eventBus: () => EventBus<BlockEvents<Props<P>>>;

  private _element: HTMLElement | null = null;

  private first: boolean = true;

  constructor(propsAndChildren: Props<P> = {} as Props<P>) {
    const eventBus = new EventBus<BlockEvents<Props<P>>>();

    const { props, children } = this._getChildrenAndProps(propsAndChildren);

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: Props<P>): {
    props: Props<P>;
    children: Record<string, Block | Block[]>;
  } {
    const props = {} as Record<string, unknown>;
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof Block)
      ) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  private _addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus<BlockEvents>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWasUpdate.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((chi) => {
          chi.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentWasUpdate() {
    this.componentWasUpdate();
  }

  protected componentWasUpdate() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();

    if (this.first) {
      this.first = false;
    } else {
      this.eventBus().emit(Block.EVENTS.FLOW_CWU);
    }
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[key] = [];
        child.forEach((component) => {
          contextAndStubs[key].push(`<div data-id="${component.id}"></div>`);
        });
      } else {
        contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const fragment = document.createElement("template");

    fragment.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = fragment.content.querySelector(
        `[data-id="${component.id}"]`
      );

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach(replaceStub);
      } else {
        replaceStub(child);
      }
    });
    return fragment.content;
  }

  getContent() {
    return this._element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
