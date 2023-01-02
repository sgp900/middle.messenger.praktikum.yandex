import { Block } from "../../utils/block";
import { withStore } from "../../hocs/withStore";
import { FileLoad } from "../FileLoad/fileLoad";

import template from "./template.hbs";
import styles from "./style.scss";
import { Button } from "../Button/button";

import { Input } from "../Input/input";
import ChatsController from "../../controllers/ChatsController";
import store from "../../utils/store";

interface ChatAvatarProps {
  avatar: string;
}

export class ChatAvatar extends Block<ChatAvatarProps> {
  protected init(): void {
    this.children.FileLoad = new FileLoad({
      btnProp: {
        click(this: FileLoad) {
          const File = this.children.fileInput as Input;
          const blobFile = File.element as HTMLInputElement;

          const state = store.getState();
          if (blobFile.files?.length && state.currentChat) {
            const formData = new FormData();
            formData.append("avatar", blobFile.files[0]);
            formData.append("chatId", String(state.currentChat));

            ChatsController.setAvatar(formData);
            this.props.error = "";

            this.hide();
          } else {
            this.props.error = "Файл не выбран";
          }
        },
      },
    });

    this.children.FileLoad.hide();

    this.children.button = new Button({
      class: "chat-avatar__btn",
      // label: "Поменять аватар",
      events: {
        click: () => {
          (this.children.FileLoad as FileLoad).show();
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

function mapStateToProps(state: any): ChatAvatarProps | {} {
  if (state?.currentChat) {
    const { currentChat } = state;
    return {
      avatar: state.chats[currentChat].avatar,
      avatarSrc: state.chats[currentChat].avatarSrc,
    };
  }

  return {
    avatar: undefined,
    avatarSrc: undefined,
  };
}

export const UserAvatarComponent = withStore(mapStateToProps)(ChatAvatar);
