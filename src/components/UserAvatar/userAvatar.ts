import { Block } from "../../utils/block";
import { withStore } from "../../hocs/withStore";
import { FileLoad } from "../FileLoad/fileLoad";
import ResourcesController from "../../controllers/ResourcesController";

import template from "./template.hbs";
import styles from "./style.scss";
import defaultAvatar from "../../../img/avatar.svg";
import { Button } from "../Button/button";

import UserController from "../../controllers/UserController";
import { Input } from "../Input/input";

interface AvatarProps {
  avatar: string;
  avatarSrc: string;
  avatarIsLoading: boolean;
}

export class UserAvatar extends Block<AvatarProps> {
  protected init(): void {
    if (this.props.avatar) {
      ResourcesController.getAvatar(this.props.avatar as string);
    }

    this.children.FileLoad = new FileLoad({
      btnProp: {
        click(this: FileLoad) {
          const File = this.children.fileInput as Input;
          const blobFile = File.element as HTMLInputElement;

          if (blobFile.files?.length) {
            const formData = new FormData();
            formData.append("avatar", blobFile.files[0]);
            UserController.avatar(formData);
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
      class: "profile__btn-change",
      label: "Поменять аватар",
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

function mapStateToProps(state: any): AvatarProps | {} {
  if (state?.user.data.avatar) {
    const { data } = state.user;
    return {
      avatar: data.avatar,
      avatarSrc: data.avatarSrc,
      avatarIsLoading: data.avatarIsLoading,
    };
  }

  return {
    avatar: undefined,
    avatarSrc: defaultAvatar,
    avatarIsLoading: false,
  };
}

export const UserAvatarComponent = withStore(mapStateToProps)(UserAvatar);
