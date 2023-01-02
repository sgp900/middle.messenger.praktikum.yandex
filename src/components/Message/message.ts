import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";
import { MessageProps, User } from "../../interfaces/interface";
import { isToday } from "../../utils/helpers";

export class Message extends Block<MessageProps> {
  constructor(data: MessageProps, users: User[] | undefined) {
    if (!data.isMine) {
      const user = users?.find(
        (item) => String(item.id) === String(data.user_id)
      );

      if (user && ("display_name" in user || "login" in user)) {
        data.user_name = user!.display_name ? user!.display_name : user!.login;
      } else {
        data.user_name = "Удалён";
      }
    }

    const dateMsg = new Date(Date.parse(data.time));
    const hours = `${dateMsg.getHours()}`.padStart(2, "0");
    const minutes = `${dateMsg.getMinutes()}`.padStart(2, "0");

    let timestamp = `${hours}:${minutes}`;

    if (!isToday(dateMsg)) {
      const months = `${dateMsg.getMonth()}`.padStart(2, "0");
      const days = `${dateMsg.getDate()}`;

      timestamp = `${days}.${months} ${timestamp}`;
    }
    super({ ...data, time: timestamp });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
