import { Block } from "../../utils/block";
import { Input } from "../Input/input";
import template from "./template.hbs";
import styles from "./style.scss";

export interface ProfileFieldProps {
  name: string;
  title: string;
  error: string;
  data?: string;
  funcValid: (value: string) => boolean;
}

export class ProfileField extends Block<ProfileFieldProps> {
  protected init(): void {
    this.children.input = new Input({
      name: this.props.name,
      class: "profile-listitem__input",
      data: this.props.data,
      events: {
        focus: (e) => {
          const { value } = e!.target as HTMLInputElement;
          this.isFieldOk(value);
        },
        blur: (e) => {
          const { value } = e!.target as HTMLInputElement;
          if (!this.isFieldOk(value)) {
            this.element!.querySelector(
              ".profile-listitem__error"
            )!.classList.toggle("profile-listitem__error--alarm", true);
          }
        },
      },
    });
  }

  public isFieldOk(value: string): boolean | undefined {
    if (!this.props.funcValid) return undefined;

    const classElement = this.element!.getAttribute("class");

    if (this.props.funcValid(value)) {
      this.element!.querySelector<HTMLElement>(
        `.${classElement}__error`
      )!.style.display = "none";
      return true;
    }
    this.element!.querySelector<HTMLElement>(
      `.${classElement}__error`
    )!.style.display = "block";
    return false;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
