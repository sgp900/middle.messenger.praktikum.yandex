import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";
import store from "../../utils/store";
import { ChatsResponse } from "../../interfaces/interface";
import { isToday } from "../../utils/helpers";

export class Chat extends Block<ChatsResponse> {
  constructor(props: ChatsResponse) {
    if (props.last_message) {
      const lastMsgTime = new Date(Date.parse(props.last_message.time));
      if (isToday(lastMsgTime)) {
        const hours = `${lastMsgTime.getHours()}`.padStart(2, "0");
        const minutes = `${lastMsgTime.getMinutes()}`.padStart(2, "0");

        props.time = `${hours}:${minutes}`;
      } else {
        const day = `${lastMsgTime.getDate()}`.padStart(2, "0");
        const month = `${lastMsgTime.getMonth()}`.padStart(2, "0");

        props.time = `${day}.${month}`;
      }
    }

    super({
      events: {
        click: () => {
          store.set("currentChat", this.props.id);
        },
      },
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
