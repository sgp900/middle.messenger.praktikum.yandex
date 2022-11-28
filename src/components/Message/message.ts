import Block from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface MessageProps {
  text: string;
  your: boolean;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (e?: Event) => void>;
}

export default class Message extends Block<MessageProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}