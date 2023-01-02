import { Block } from "../../utils/block";

import styles from "./style.scss";
import template from "./template.hbs";

import { Link } from "../../components/Link/link";
import AuthController from "../../controllers/AuthController";
import { withStore } from "../../hocs/withStore";
import router from "../../utils/router";
import { UserAvatarComponent } from "../../components/UserAvatar/userAvatar";
import { Button } from "../../components/Button/button";

interface ProfileProps {
  isLoading: boolean;
  error: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  inputData?: Array<Record<string, string | unknown>>;
}

class Profile extends Block<ProfileProps> {
  protected init() {
    this.children.avatar = new UserAvatarComponent({});

    this.children.buttonBack = new Button({
      class: "profile__btn-back",
      type: "button",
      arrowBack: true,
      events: {
        click: () => {
          router.go("/messenger");
        },
      },
    });

    this.children.linkProfileEdit = new Link({
      label: "Изменить данные",
      href: "/profile/edit",
      events: {
        click: () => {
          router.go("/profile/edit");
        },
      },
    });

    this.children.linkPassChange = new Link({
      label: "Изменить пароль",
      href: "/profile/password",
      events: {
        click: () => {
          router.go("/profile/password");
        },
      },
    });

    this.children.linkOut = new Link({
      label: "Выйти",
      href: "/",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const mapUserStateToProps = (state: any): ProfileProps | {} => {
  if (state?.user) {
    const { data } = state.user;

    return {
      ...state.user.isLoading,
      ...state.user.error,
      ...data,
      inputData: [
        {
          name: "email",
          title: "Почта",
          data: data.email,
        },
        {
          name: "login",
          title: "Логин",
          data: data.login,
        },
        {
          name: "first_name",
          title: "Имя",
          data: data.first_name,
        },
        {
          name: "second_name",
          title: "Фамилия",
          data: data.second_name,
        },
        {
          name: "display_name",
          title: "Имя в чате",
          data: data.display_name,
        },
        {
          name: "phone",
          title: "Телефон",
          data: data.phone,
        },
      ],
    };
  }
  return {};
};

export const ProfilePage = withStore(mapUserStateToProps)(Profile);
