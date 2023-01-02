import { Block } from "../../utils/block";
import { Validation } from "../../utils/validation";
import {
  PlaceHolderInput,
  PlaceHolderInputProps,
} from "../../components/PlaceHolderInput/placeHolderInput";
import { Button } from "../../components/Button/button";
import styles from "./style.scss";
import template from "./template.hbs";
import { Link } from "../../components/Link/link";
import AuthController from "../../controllers/AuthController";

interface RegistrationProps extends Record<string, any> {
  action: string;
  title: string;
  classWrapper?: string;
  linkText: string;
  linkAction: string;
  btnLabel?: string;
  route?: string;
  fields: PlaceHolderInputProps[];
  events?: Record<string, () => void>;
}

export class Registration extends Block<RegistrationProps> {
  init() {
    this.props.classWrapper = "form-registration";
    this.props.title = "Регистрация";
    this.props.btnLabel = "Зарегистрироваться";
    this.props.linkText = "Войти";
    this.props.linkAction = "/";
    this.props.fields = [
      {
        name: "email",
        type: "text",
        placeholder: "Почта",
        error:
          "латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
        funcValid: Validation.validEmail,
      },
      {
        name: "login",
        type: "text",
        placeholder: "Логин",
        error:
          "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
        funcValid: Validation.validLogin,
      },
      {
        name: "first_name",
        type: "text",
        placeholder: "Имя",
        error:
          "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
        funcValid: Validation.validName,
      },
      {
        name: "second_name",
        type: "text",
        placeholder: "Фамилия",
        error:
          "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
        funcValid: Validation.validName,
      },
      {
        name: "phone",
        type: "text",
        placeholder: "Телефон",
        error:
          "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
        funcValid: Validation.validPhone,
      },
      {
        name: "password",
        type: "password",
        placeholder: "Пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        funcValid: Validation.validPass,
      },
      {
        name: "passwordConfirm",
        type: "password",
        placeholder: "Повторите пароль",
        error:
          "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        funcValid: Validation.validPass,
      },
    ];

    this.children.fields = Registration.createPlaceHolderInputs(
      this.props.fields
    );

    this.props.events = { submit: this.handleSubmit.bind(this) };

    this.children.loginButton = new Button({
      label: this.props.btnLabel,
    });

    this.children.link = new Link({
      label: this.props.linkText,
      href: this.props.linkAction,
      class: "form__link",
    });
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const [fail, toServer] = Registration.checkFields(
      this.children.fields as Array<PlaceHolderInput>
    );
    if (!fail) {
      AuthController.signup(toServer as any);
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
