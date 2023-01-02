import { withStore } from "../../hocs/withStore";
import { Block } from "../../utils/block";
import { ErrorBox } from "../../components/ProfileField/ErrorBox/errorBox";
import { Validation } from "../../utils/validation";
import UserController from "../../controllers/UserController";

import styles from "./style.scss";
import template from "./template.hbs";
import defaultAvatar from "../../../img/avatar.svg";
import { Button } from "../../components/Button/button";
import {
  ProfileField,
  ProfileFieldProps,
} from "../../components/ProfileField/profileField";
import { UserAvatarComponent } from "../../components/UserAvatar/userAvatar";
import router from "../../utils/router";

export interface ProfileEditProps {
  error?: string;
  localError?: string;
  isLoading?: boolean;
  avatar?: string;
  fields: ProfileFieldProps[];
}

class ChangePassword extends Block<ProfileEditProps> {
  constructor(props: ProfileEditProps) {
    if (!props.avatar) {
      props.avatar = defaultAvatar;
    }
    super(props);
  }

  protected init(): void {
    this.children.buttonBack = new Button({
      class: "profile__btn-back",
      arrowBack: true,
      type: "button",
      events: {
        click: () => {
          router.go("/profile");
        },
      },
    });

    this.children.avatar = new UserAvatarComponent({});

    this.children.fields = ChangePassword.createProfileFields(
      this.props.fields
    );

    this.props.events = { submit: this.handleSubmit.bind(this) };

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
  ): [boolean, Record<string, string>] {
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
    return [fail, toServer];
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const [fail, toServer] = ChangePassword.checkFields(
      this.children.fields as Array<ProfileField>
    );
    if (!fail) {
      UserController.changePassword(
        toServer.oldPassword,
        toServer.newPassword,
        toServer.confirmPassword
      );
    }
  }

  render(): DocumentFragment {
    const fields = this.children.fields as ProfileField[];

    let errBox = fields[0].children.errorBox as ErrorBox;
    errBox.props.value = this.props.error;

    errBox = fields[1].children.errorBox as ErrorBox;
    errBox.props.value = this.props.localError;

    errBox = fields[2].children.errorBox as ErrorBox;
    errBox.props.value = this.props.localError;

    return this.compile(template, { ...this.props, styles });
  }
}

const mapUserStateToProps = (state: any) => {
  const props: ProfileEditProps = {
    fields: [
      {
        name: "oldPassword",
        title: "Старый пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        type: "password",
        funcValid: Validation.validPass,
      },
      {
        name: "newPassword",
        title: "Новый пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        type: "password",
        funcValid: Validation.validPass,
      },
      {
        name: "confirmPassword",
        title: "Повторите новый пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        type: "password",
        funcValid: Validation.validPass,
      },
    ],
  };

  if (state.profile) {
    props.isLoading = state.profile?.isLoading || false;
    props.error = state.profile?.error || "";
    props.localError = state.profile?.localError || "";
  }

  return props;
};

export const ChangePasswordPage =
  withStore(mapUserStateToProps)(ChangePassword);
