import Block from "../../utils/block";
import Input from "../Input/input";

import template from "./template.hbs";
import styles from "./style.scss";

export interface PlaceHolderInputProps {
  class?: string;
  name: string;
  type?: string;
  placeholder: string;
  error?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  funcValid?: (value: string) => boolean;
  events?: Record<string, () => void>;
}

export class PlaceHolderInput extends Block<PlaceHolderInputProps> {
  protected init(): void {
    this.children.input = new Input({
      name: this.props.name,
      class: "placeHolderInput__input",
      placeholder: "&nbsp;",
      data: this.props.value,
      events: {
        focus: (e) => {
          const { value } = e!.target as HTMLInputElement;
          this.isFieldOk(value);
        },
        blur: (e) => {
          const { value } = e!.target as HTMLInputElement;
          if (!this.isFieldOk(value)) {
            this.element!.querySelector(
              ".placeHolderInput__error",
            )!.classList.toggle("placeHolderInput__error--alarm", true);
          }
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return oldProps.error !== newProps.error;
  }

  public isFieldOk(value: string): boolean | undefined {
    if (!this.props.funcValid) return undefined;

    const classElement = this.element!.getAttribute("class");

    if (this.props.funcValid(value)) {
      this.element!.querySelector<HTMLElement>(
        `.${classElement}__error`,
      )!.style.display = "none";
      return true;
    }

    this.element!.querySelector<HTMLElement>(
      `.${classElement}__error`,
    )!.style.display = "block";

    return false;
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
