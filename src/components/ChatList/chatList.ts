import Block from "../../utils/block";
import { Chat, ChatProps } from "../Chat/chat";
import SearchInput from "../SearchInput/searchInput";
import Button from "../Button/button";

import renderPage from "../../utils/render";

import template from "./template.hbs";
import styles from "./style.scss";

interface ChatsListProps {
  chats: ChatProps[];
}

export default class ChatList extends Block<ChatsListProps> {
  protected init() {
    this.children.chats = ChatList.createChats(this.props.chats);
    this.children.searchInput = new SearchInput({
      name: "searchChat",
      placeholder: "Поиск",
    });
    this.children.showProfileBtn = new Button({
      label: "Профиль",
      class: "show-profile__btn",
      events: {
        click: () => {
          renderPage("profileShow");
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }

  private static createChats(chats: ChatProps[]) {
    return chats.map((data) => new Chat({ ...data }));
  }
}
