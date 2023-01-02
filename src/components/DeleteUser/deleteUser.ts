import { Block } from "../../utils/block";
import { Button } from "../Button/button";

import template from "./template.hbs";
import styles from "./style.scss";
import { User } from "../../interfaces/interface";
import { DeleteUserElement } from "./DeleteUserElement/deleteUserElement";

export interface DeleteUserProps {
  error?: string;
  users?: User[];
  escBtnClick: () => void;
}

export class DeleteUser extends Block<DeleteUserProps> {
  protected init(): void {
    if (this.props.users) {
      this.children.userList = this.props.users.map(
        (user) => new DeleteUserElement({ user })
      );
    }

    this.children.buttonEsc = new Button({
      label: "Отмена",
      class: "button btn--white",
      events: {
        click: this.props.escBtnClick,
      },
    });
  }

  show() {
    this.getContent()!.style.display = "flex";
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
