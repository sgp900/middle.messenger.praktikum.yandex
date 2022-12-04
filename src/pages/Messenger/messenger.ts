import { Block } from "../../utils/block";
import { PlaceHolderInput } from "../../components/PlaceHolderInput/placeHolderInput";
import {
  CurrentChat,
  CurrentChatProps,
} from "../../components/CurrentChat/currentChat";
import { ChatProps } from "../../components/Chat/chat";
import { OverlayInput } from "../../components/OverlayInput/overlayInput";
import { Button } from "../../components/Button/button";
import { ChatList } from "../../components/ChatList/chatList";
import template from "./template.hbs";
import styles from "./style.scss";

export interface MessengerProps {
  userName: string;
  chatList: ChatProps[];
  currentChat: CurrentChatProps;
}

export class Messenger extends Block<MessengerProps> {
  init() {
    this.children.currentChat = new CurrentChat(this.props.currentChat);

    this.children.chatList = new ChatList({ chats: this.props.chatList });

    this.children.overlays = [
      new OverlayInput({
        class: "add-user",
        caption: "Добавить пользователя",
        input: new PlaceHolderInput({
          name: "addUser",
          placeholder: "Логин",
        }),
        btn: new Button({
          label: "Добавить",
          events: {
            click: () => {
              const overlay = document.querySelector(".overlay.add-user");
              overlay!.classList.toggle("hide");
            },
          },
        }),
      }),

      new OverlayInput({
        class: "del-user",
        caption: "Удалить пользователя",
        input: new PlaceHolderInput({
          name: "delUser",
          placeholder: "Логин",
          value: "Вадим",
        }),
        btn: new Button({
          label: "Удалить",
          events: {
            click: () => {
              const overlay = document.querySelector(".overlay.del-user");
              overlay!.classList.toggle("hide");
            },
          },
        }),
      }),
    ];
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
