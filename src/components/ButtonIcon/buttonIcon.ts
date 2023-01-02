import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface ButtonIconProps {
  label?: string;
  class?: string;
  type?: string;
  events?: Record<string, () => void>;
}

export class ButtonIcon extends Block<ButtonIconProps> {
  constructor(props: ButtonIconProps) {
    super({ type: "button", class: "button", ...props });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
