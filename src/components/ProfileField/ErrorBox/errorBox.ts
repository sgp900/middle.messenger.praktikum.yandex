import { Block } from "../../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface ErrorBoxProps {
  class?: string;
  value?: string;
}

export class ErrorBox extends Block<ErrorBoxProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
