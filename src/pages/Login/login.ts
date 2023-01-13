import AuthController from "../../controllers/AuthController";
import { Block } from "../../utils/block";
import { Validation } from "../../utils/validation";
import {
  PlaceHolderInput,
  PlaceHolderInputProps,
} from "../../components/PlaceHolderInput/placeHolderInput";
import { Button } from "../../components/Button/button";
import { Link } from "../../components/Link/link";
import styles from "./style.scss";
import template from "./template.hbs";

interface LoginProps extends Record<string, any> {
  title: string;
  classWrapper?: string;
  linkText: string;
  linkAction: string;
  btnLabel?: string;
  route?: string;
  fields: PlaceHolderInputProps[];
  events?: Record<string, () => void>;
}

export class Login extends Block<LoginProps> {
  init() {
    this.props.title = "Вход";
    this.props.linkText = "Нет аккаунта?";
    this.props.linkAction = "/register";
    this.props.classWrapper = "form-login";
    this.props.fields = [
      {
        name: "login",
        type: "text",
        placeholder: "Логин",
        error:
          "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
        funcValid: Validation.validLogin,
      },
      {
        name: "password",
        type: "password",
        placeholder: "Пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        funcValid: Validation.validPass,
      },
    ];

    this.children.fields = Login.createPlaceHolderInputs(this.props.fields);

    this.children.loginButton = new Button({
      label: "Авторизоваться",
      type: "button",
      events: {
        click: () => this.handleSubmit(),
      },
    });

    this.children.link = new Link({
      label: this.props.linkText,
      href: this.props.linkAction,
      class: "form__link",
    });
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const [fail, toServer] = Login.checkFields(
      this.children.fields as Array<PlaceHolderInput>
    );
    if (!fail) {
      AuthController.signin(toServer as any);
    }
  }

  private static createPlaceHolderInputs(props: Array<PlaceHolderInputProps>) {
    return props.map((data) => new PlaceHolderInput(data));
  }

  private static checkFields(
    fields: Array<PlaceHolderInput>
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

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
