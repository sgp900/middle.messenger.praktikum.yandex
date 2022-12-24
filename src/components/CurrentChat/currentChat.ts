import { Block } from "../../utils/block";

import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { Message } from "../Message/message";
import { MessageProps, User, ChatsResponse } from "../../interfaces/interface";
import { Validation } from "../../utils/validation";

import template from "./template.hbs";
import styles from "./style.scss";

import clip from "../../../img/clip.svg";
import iconFile from "../../../img/iconFile.svg";
import iconLocation from "../../../img/iconLocation.svg";
import iconPhotoVideo from "../../../img/iconPhotoVideo.svg";
import { withStore } from "../../hocs/withStore";
import messagesController from "../../controllers/MessagesController";
import { OverlayInput } from "../../components/OverlayInput/overlayInput";
import { ButtonIcon } from "../ButtonIcon/buttonIcon";
import ChatsController from "../../controllers/ChatsController";
import { PlaceHolderInput } from "../PlaceHolderInput/placeHolderInput";
import store from "../../utils/store";
import { DeleteUser } from "../DeleteUser/deleteUser";
import { ChatAvatar } from "../ChatAvatar/chatAvatar";

export interface CurrentChatProps {
  selectedChats?: number;
  title: string;
  messages: MessageProps[];
  avatar: string;
  imgs?: Record<string, string>;
  events?: Record<string, (e?: Event) => void>;
  userID: string;
  usersCurentChat?: User[];
  delOverlayShow?: boolean;
}

class CurrentChat extends Block<CurrentChatProps> {
  constructor(props: CurrentChatProps) {
    props.imgs = {
      clip,
      iconFile,
      iconLocation,
      iconPhotoVideo,
    };
    super({ delOverlayShow: false, ...props });
  }

  protected init() {
    this.props.events = { submit: this.handleSubmit.bind(this) };

    this.children.newMsgInput = new Input({
      name: "message",
      placeholder: "Сообщение",
      class: "currentchat-newmsg__input",
    });

    this.children.sendBtn = new Button({
      class: "arrow-button",
    });

    const overlayAddUser = new OverlayInput({
      class: "add-user",
      caption: "Добавить пользователя",
      input: {
        name: "addUser",
        placeholder: "Логин",
      },
      buttonOk: {
        label: "Добавить",
        events: {
          click(this: OverlayInput) {
            const userNameInput = this.children.input as PlaceHolderInput;
            const userName = userNameInput.getValue();

            if (userName) {
              ChatsController.addUserToChat(userName);

              userNameInput.setValue("");
              this.hide();
            } else {
              this.props.error = "Введите имя пользователя";
            }
          },
        },
      },
    });

    overlayAddUser.hide();

    this.children.overlayAddUser = overlayAddUser;

    this.children.addUserBtn = new ButtonIcon({
      class:
        "btn-drop__drop-icon currentchat-action__icon currentchat-action__icon_add",
      label: "Добавить пользователя",
      events: {
        click: () => {
          overlayAddUser.show();
        },
      },
    });

    this.children.delUserBtn = new ButtonIcon({
      class:
        "btn-drop__drop-icon currentchat-action__icon currentchat-action__icon_del",
      label: "Удалить пользователя",
      events: {
        click: () => {
          this.props.delOverlayShow = true;
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: CurrentChatProps,
    newProps: CurrentChatProps
  ): boolean {
    if (!newProps.selectedChats) {
      if (!oldProps.selectedChats) {
        return true;
      }
      return false;
    }

    if (oldProps.selectedChats !== newProps.selectedChats) {
      this.children.messages = [];
    }

    const overlayDelUser = new DeleteUser({
      users: this.props.usersCurentChat,
      escBtnClick: this.delOverlayHide,
    });

    this.children.overlayDelUser = overlayDelUser;

    if (this.props.delOverlayShow) {
      this.children.overlayDelUser.show();
    } else {
      this.children.overlayDelUser.hide();
    }

    if (this.props.messages && this.props.messages.length) {
      this.children.messages = CurrentChat.createMessages(this.props);
    }

    this.children.delChatBtn = new ButtonIcon({
      class:
        "btn-drop__drop-icon currentchat-action__icon currentchat-action__icon_del",
      label: "Удалить чат",
      events: {
        click: () => {
          if (this.props.selectedChats) {
            ChatsController.delete(this.props.selectedChats);
          }
        },
      },
    });

    this.children.avatarImg = new ChatAvatar({ avatar: this.props.avatar });

    return true;
  }

  private static createMessages(props: CurrentChatProps): Message[] | [] {
    const state = store.getState();

    if (props.selectedChats) {
      const users: User[] = state.chats.users[props.selectedChats];

      return props.messages.map(
        (data) =>
          new Message({ ...data, isMine: data.user_id === props.userID }, users)
      );
    }
    return [];
  }

  private delOverlayHide = () => {
    this.props.delOverlayShow = false;
  };

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const newMsgInput = this.children.newMsgInput as Input;
    const element = newMsgInput.element as HTMLInputElement;
    const { value } = element;

    if (value && Validation.validMsg(value)) {
      newMsgInput.props.placeholder = "Сообщение";
      newMsgInput.props.class = "currentchat-newmsg__input";

      messagesController.sendMessage(this.props.selectedChats!, value);
    } else {
      newMsgInput.props.placeholder = "Сообщение не должно быть пустым";
      newMsgInput.props.class =
        "currentchat-newmsg__input currentchat-newmsg__input--alarm";
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

function getChatById(
  id: number,
  chats: ChatsResponse[]
): ChatsResponse | undefined {
  const chat = chats.find((item) => item.id === id);
  return chat;
}

export const CurrentChatComponent = withStore((state: any) => {
  const selectedChatId = state.currentChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChats: undefined,
      userID: state.user.data.id,
    };
  }

  const chat = getChatById(selectedChatId, state.chats.data);

  return {
    title: chat?.title,
    messages: (state.messages || {})[selectedChatId] || [],
    avatar: chat?.avatarSrc,
    selectedChats: state.currentChat,
    userID: state.user.data.id,
    usersCurentChat: state.chats.users[selectedChatId],
  };
})(CurrentChat);
