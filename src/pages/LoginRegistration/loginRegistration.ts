import { Block } from "../../utils/block";
import { renderPage } from "../../utils/render";
import {
  PlaceHolderInput,
  PlaceHolderInputProps,
} from "../../components/PlaceHolderInput/placeHolderInput";
import { Button } from "../../components/Button/button";
import styles from "./style.scss";
import template from "./template.hbs";
import { HTTPTransport } from "../../utils/HTTPTransport";

interface LoginRegistrationProps {
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

export class LoginRegistration extends Block<LoginRegistrationProps> {
  init() {
    this.children.fields = LoginRegistration.createPlaceHolderInputs(
      this.props.fields
    );

    this.props.events = { submit: this.handleSubmit.bind(this) };

    if (this.props.action === "login") {
      this.props.btnLabel = "Авторизоваться";
      this.props.route = "messenger";
      this.props.classWrapper = "form-login";
    } else {
      this.props.btnLabel = "Зарегистрироваться";
      this.props.route = "messenger";
      this.props.classWrapper = "form-registration";
    }

    this.children.loginButton = new Button({
      label: this.props.btnLabel,
    });
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const [fail, toServer] = LoginRegistration.checkFields(
      this.children.fields as Array<PlaceHolderInput>
    );
    if (!fail) {
      console.log(toServer);

      const HttpRequest = new HTTPTransport();
      const resp = HttpRequest.post("/", { data: toServer });
      resp.catch((error) => {
        console.log(error);
      });

      renderPage(this.props.route);
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
