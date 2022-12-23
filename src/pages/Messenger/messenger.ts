import { Block } from "../../utils/block";
import {
  CurrentChatComponent,
  CurrentChatProps,
} from "../../components/CurrentChat/currentChat";

import { ChatsResponse } from "../../interfaces/interface";

import { ChatListComponent } from "../../components/ChatList/chatList";
import template from "./template.hbs";
import styles from "./style.scss";
import ChatController from "../../controllers/ChatsController";

export interface MessengerProps {
  userName: string;
  chatList: ChatsResponse[];
  currentChat: CurrentChatProps;
}

export class Messenger extends Block<MessengerProps> {
  init() {
    this.children.currentChat = new CurrentChatComponent({});

    this.children.chatList = new ChatListComponent({});

    ChatController.fetchChats().finally(() => {
      (this.children.chatList as Block).props.isLoaded = true;
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
