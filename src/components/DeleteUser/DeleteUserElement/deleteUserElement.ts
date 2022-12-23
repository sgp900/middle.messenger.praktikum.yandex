import { Block } from "../../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";
import { User } from "../../../interfaces/interface";
import { Button } from "../../Button/button";
import ChatsController from "../../../controllers/ChatsController";

export interface DeleteUserElementProps {
  user: User;
}

export class DeleteUserElement extends Block<DeleteUserElementProps> {
  protected init(): void {
    this.children.button = new Button({
      label: "Удалить",
      events: {
        click: () => {
          ChatsController.deleteUserFromChat(this.props.user.id);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
