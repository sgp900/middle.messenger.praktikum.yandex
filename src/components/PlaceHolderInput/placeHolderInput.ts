import { Block } from "../../utils/block";
import { Input } from "../Input/input";
import { ErrorBox } from "./ErrorBox/errorBox";

import template from "./template.hbs";
import styles from "./style.scss";

export interface PlaceHolderInputProps {
  class?: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  funcValid?: (value: string) => boolean;
  events?: Record<string, () => void>;
}

export class PlaceHolderInput extends Block<PlaceHolderInputProps> {
  protected init(): void {
    this.children.input = new Input({
      name: this.props.name,
      type: this.props.type,
      class: "placeHolderInput__input",
      placeholder: "&nbsp;",
      data: this.props.value,
      events: {
        focus: (e) => {
          if (!e) return;

          const { value } = e.target as HTMLInputElement;
          this.isFieldOk(value);
        },
        blur: (e) => {
          if (!e || !e.target) return;

          const errorBox = this.children.errorBox as ErrorBox;
          const { value } = e.target as HTMLInputElement;

          if (!this.isFieldOk(value)) {
            errorBox.props.class = "placeHolderInput__error--alarm";
          } else {
            errorBox.props.class = "";
          }
        },
      },
    });

    this.children.errorBox = new ErrorBox();
  }

  public getValue() {
    const input = this.children.input as Input;
    return (input.element as HTMLInputElement).value;
  }

  public setValue(val: string) {
    const input = this.children.input as Input;
    (input.element as HTMLInputElement).value = val;
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return oldProps.error !== newProps.error;
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
