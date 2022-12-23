import { Block } from "../../utils/block";
import { withStore } from "../../hocs/withStore";
import { FileLoad } from "../FileLoad/fileLoad";
import ResourcesController from "../../controllers/ResourcesController";

import template from "./template.hbs";
import styles from "./style.scss";
import defaultAvatar from "../../../img/avatar.svg";
import { Button } from "../Button/button";

interface AvatarProps {
  avatar: string;
  avatarSrc: string;
  avatarIsLoading: boolean;
}

export class Avatar extends Block<AvatarProps> {
  protected init(): void {
    if (this.props.avatar) {
      ResourcesController.getAvatar(this.props.avatar as string);
    }

    this.children.FileLoad = new FileLoad();
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

export const AvatarComponent = withStore(mapStateToProps)(Avatar);
