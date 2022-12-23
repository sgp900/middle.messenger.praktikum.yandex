import { Block } from "../../utils/block";
import { Chat } from "../Chat/chat";
import { SearchInput } from "../SearchInput/searchInput";
import { Button } from "../Button/button";
import { withStore } from "../../hocs/withStore";

import template from "./template.hbs";
import styles from "./style.scss";
import router from "../../utils/router";
import { OverlayInput } from "../OverlayInput/overlayInput";
import { PlaceHolderInput } from "../PlaceHolderInput/placeHolderInput";
import ChatsController from "../../controllers/ChatsController";

import { ChatsResponse } from "../../interfaces/interface";

interface ChatsListProps {
  chats: ChatsResponse[];
  userID: string;
  isLoaded: boolean;
}

class ChatList extends Block<ChatsListProps> {
  protected init() {
    this.children.searchInput = new SearchInput({
      name: "searchChat",
      placeholder: "Поиск",
    });

    this.children.showProfileBtn = new Button({
      label: "Профиль",
      class: "show-profile__btn",
      type: "button",
      events: {
        click: () => {
          router.go("/profile");
        },
      },
    });

    this.children.addChat = new OverlayInput({
      class: "newchat__overlay",
      caption: "Создать новый чат",
      input: {
        class: "newchat__input",
        name: "title",
        placeholder: "Название чата",
      },
      buttonOk: {
        label: "Создать",
        events: {
          click(this: OverlayInput): void {
            const input = this.children.input as PlaceHolderInput;

            if (input.getValue().length) {
              ChatsController.create(input.getValue());
              this.hide();
            } else {
              this.props.error = "Введите название чата";
            }
          },
        },
      },
    });

    this.children.addChat.hide();

    this.children.addChatBtn = new Button({
      label: "Создать чат",
      type: "button",
      class: "button addBtn",
      events: {
        click: () => {
          console.log("create new chat");
          (this.children.addChat as Block).show();
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    if (this.props.isLoaded) {
      this.children.chatsChild = ChatList.createChats(newProps);
      return true;
    }

    return false;
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }

  private static createChats(props: ChatsListProps) {
    return props.chats.map((data) => new Chat(data));
  }
}

const mapStateToProps = (state: any): ChatsListProps | {} => {
  if (state.chats) {
    return {
      chats: state.chats.data,
      userID: state.user.data.id,
    };
  }

  return {
    chats: [],
    userID: state.user.data.id,
  };
};

export const ChatListComponent = withStore(mapStateToProps)(ChatList);
