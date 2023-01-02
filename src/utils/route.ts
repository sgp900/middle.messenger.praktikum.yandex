import { Block } from "./block";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
}

export class Route {
  private block: Block | null = null;

  /* eslint-disable-next-line */
  constructor(
    private pathname: string,
    private readonly BlockClass: typeof Block,
    private readonly query: string,
    private readonly blockProps?: Record<
      string,
      string
    > /* eslint-disable-next-line */
  ) {}

  leave() {
    this.block?.dispatchComponentWillUnmount();

    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      const props = this.blockProps ? this.blockProps : {};

      this.block = new this.BlockClass(props);

      render(this.query, this.block);
    }
  }
}
