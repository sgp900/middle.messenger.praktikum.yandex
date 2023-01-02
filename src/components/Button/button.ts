import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface ButtonProps {
  label?: string;
  class?: string;
  type?: string;
  arrowBack?: boolean;
  events?: Record<string, () => void>;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: "submit", class: "button", ...props });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
