import { withStore } from "../../hocs/withStore";
import { Block } from "../../utils/block";
import { Validation } from "../../utils/validation";
import UserController from "../../controllers/UserController";

import styles from "./style.scss";
import template from "./template.hbs";
import { Button } from "../../components/Button/button";
import {
  ProfileField,
  ProfileFieldProps,
} from "../../components/ProfileField/profileField";
import { UserAvatarComponent } from "../../components/UserAvatar/userAvatar";
import router from "../../utils/router";
import { User } from "../../interfaces/interface";

export interface ProfileEditProps {
  avatar?: string;
  fields: ProfileFieldProps[];
}

export class ProfileEdit extends Block<ProfileEditProps> {
  protected init(): void {
    this.children.buttonBack = new Button({
      class: "profile__btn-back",
      type: "button",
      arrowBack: true,
      events: {
        click: () => {
          router.go("/profile");
        },
      },
    });

    this.children.avatar = new UserAvatarComponent({});

    this.props.events = { submit: this.handleSubmit.bind(this) };

    this.children.fields = ProfileEdit.createProfileFields(this.props.fields);

    this.children.saveBtn = new Button({
      label: "Сохранить",
      class: "button save-info",
    });
  }

  private static createProfileFields(props: ProfileFieldProps[]) {
    return props.map((data) => new ProfileField(data));
  }

  private static checkFields(
    fields: Array<ProfileField>
  ): [boolean, User] | undefined {
    let fail = false;
    // eslint-disable-next-line prefer-const
    let toServer: Record<string, string> = {};

    fields.forEach((child) => {
      const inputElement = child.element!.querySelector("input");
      if (inputElement !== null) {
        const { name } = inputElement;
        const value = inputElement!.value.trim();

        toServer[name] = value;

        if (!child.isFieldOk(value)) {
          fail = true;
        }
      }
    });

    const isUser = (b: any): b is User =>
      "first_name" in b &&
      "second_name" in b &&
      "login" in b &&
      "email" in b &&
      "phone" in b;

    if (isUser(toServer)) {
      return [fail, toServer as User];
    }

    return undefined;
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const ret = ProfileEdit.checkFields(
      this.children.fields as Array<ProfileField>
    );

    if (ret) {
      const [fail, toServer] = ret;
      if (!fail) {
        UserController.editProfile(toServer);
      }
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const mapUserStateToProps = (state: any): ProfileEditProps | {} => {
  if (state?.user) {
    const { data } = state.user;
    return {
      ...(state.profile?.isLoading || {}),
      ...(state.profile?.error || {}),
      ...data,
      fields: [
        {
          name: "email",
          title: "Почта",
          error:
            "латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
          data: data.email,
          funcValid: Validation.validEmail,
        },
        {
          name: "login",
          title: "Логин",
          error:
            "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
          data: data.login,
          funcValid: Validation.validLogin,
        },
        {
          name: "first_name",
          title: "Имя",
          error:
            "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
          data: data.first_name,
          funcValid: Validation.validName,
        },
        {
          name: "second_name",
          title: "Фамилия",
          error:
            "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
          data: data.second_name,
          funcValid: Validation.validName,
        },
        {
          name: "display_name",
          title: "Имя в чате",
          error:
            "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
          data: data.display_name,
          funcValid: Validation.validName,
        },
        {
          name: "phone",
          title: "Телефон",
          error:
            "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
          data: data.phone,
          funcValid: Validation.validPhone,
        },
      ],
    };
  }
  return {};
};

export const ProfileEditPage = withStore(mapUserStateToProps)(ProfileEdit);
