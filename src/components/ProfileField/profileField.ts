import { Block } from "../../utils/block";
import { Input } from "../Input/input";
import { ErrorBox } from "./ErrorBox/errorBox";
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
          if (!e) return;

          const { value } = e.target as HTMLInputElement;
          this.isFieldOk(value);
        },
        blur: (e) => {
          if (!e) return;

          const errorBox = this.children.errorBox as ErrorBox;
          const { value } = e.target as HTMLInputElement;

          if (!this.isFieldOk(value)) {
            errorBox.props.class = "profile-listitem__error--alarm";
          } else {
            errorBox.props.class = "";
          }
        },
      },
    });

    this.children.errorBox = new ErrorBox();
  }

  public isFieldOk(value: string): boolean | undefined {
    if (!this.props.funcValid) return undefined;

    const error = this.children.errorBox as ErrorBox;

    if (this.props.funcValid(value)) {
      error.props.value = "";
      return true;
    }
    error.props.value = this.props.error;
    return false;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
