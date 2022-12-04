import { Block } from "../../utils/block";

import template from "./template.hbs";

interface LinkProps {
  href?: string;
  class: string;
  label: string;
  events?: Record<string, (e?: Event) => void>;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
