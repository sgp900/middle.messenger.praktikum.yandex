import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

export interface ChatProps {
  id?: number;
  avatar: string;
  name: string;
  time: string;
  msg: string;
  msgCount: number;
  events?: {
    click: () => void;
  };
}

export class Chat extends Block<ChatProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
