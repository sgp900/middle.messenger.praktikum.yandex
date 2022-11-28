import Block from "../../utils/block";

import template from "./template.hbs";

export interface InputProps {
  name: string;
  placeholder?: string;
  class: string;
  data?: string;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (e?: Event) => void>;
}

export default class Input extends Block<InputProps> {
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate() {
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
