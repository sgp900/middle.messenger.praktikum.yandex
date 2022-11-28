import Block from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface ButtonProps {
  label?: string;
  class?: string;
  type?: string;
  events?: Record<string, () => void>;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    if (props.type === undefined) {
      // eslint-disable-next-line no-param-reassign
      props.type = "submit";
    }
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
