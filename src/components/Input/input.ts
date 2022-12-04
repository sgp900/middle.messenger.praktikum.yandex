import { Block } from "../../utils/block";

import template from "./template.hbs";

export interface InputProps {
  name: string;
  placeholder?: string;
  class: string;
  data?: string;
  events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block<InputProps> {
  componentDidUpdate() {
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
