import { Block } from "../../utils/block";
import { renderPage } from "../../utils/render";

import styles from "./style.scss";
import template from "./template.hbs";
import defaultAvatar from "../../../img/avatar.svg";
import { Button } from "../../components/Button/button";
import { HTTPTransport } from "../../utils/HTTPTransport";
import {
  ProfileField,
  ProfileFieldProps,
} from "../../components/ProfileField/profileField";

export interface ProfileEditProps {
  avatar?: string;
  fields: ProfileFieldProps[];
}

export class ProfileEdit extends Block<ProfileEditProps> {
  constructor(props: ProfileEditProps) {
    if (!props.avatar) {
      props.avatar = defaultAvatar;
    }
    super(props);
  }

  protected init(): void {
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

    const [fail, toServer] = ProfileEdit.checkFields(
      this.children.fields as Array<ProfileField>
    );
    if (!fail) {
      console.log(toServer);

      const HttpRequest = new HTTPTransport();
      const resp = HttpRequest.post("/", { data: toServer });
      resp.catch((error) => {
        console.log(error);
      });

      renderPage("profileShow");
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
