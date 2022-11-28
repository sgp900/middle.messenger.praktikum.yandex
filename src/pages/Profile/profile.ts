import Block from "../../utils/block";

import styles from "./style.scss";
import template from "./template.hbs";
import defaultAvatar from "../../../img/avatar.svg";

interface ProfileProps {
  avatar?: string;
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  passwd?: string;
  newPasswd?: string;
  repPasswd?: string;
  inputData?: Array<Record<string, string | unknown>>;
}

export default class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    if (!props.avatar) {
      // eslint-disable-next-line no-param-reassign
      props.avatar = defaultAvatar;
    }
    // eslint-disable-next-line no-param-reassign
    props.inputData = [
      {
        name: "email",
        title: "Почта",
        data: props.email,
      },
      {
        name: "login",
        title: "Логин",
        data: props.login,
      },
      {
        name: "first_name",
        title: "Имя",
        data: props.firstName,
      },
      {
        name: "second_name",
        title: "Фамилия",
        data: props.secondName,
      },
      {
        name: "display_name",
        title: "Имя в чате",
        data: props.displayName,
      },
      {
        name: "phone",
        title: "Телефон",
        data: props.phone,
      },
    ];

    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
