import { Block } from "../../utils/block";

import template from "./template.hbs";

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  class?: string;
  data?: string;
  id?: string;
  accept?: string;
  events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ type: "text", ...props });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
