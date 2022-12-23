import { Block } from "../../utils/block";
import {
  PlaceHolderInput,
  PlaceHolderInputProps,
} from "../PlaceHolderInput/placeHolderInput";
import { Button } from "../Button/button";

import template from "./template.hbs";
import styles from "./style.scss";

interface buttonOkProps {
  label: string;
  events: {
    click: () => void;
  };
}

export interface OverlayInputProps {
  class?: string;
  error?: string;
  caption: string;
  input: PlaceHolderInputProps;
  buttonOk: buttonOkProps;
}

export class OverlayInput extends Block<OverlayInputProps> {
  protected init(): void {
    this.children.input = new PlaceHolderInput({
      name: this.props.input.name,
      placeholder: this.props.input.placeholder,
    });

    this.props.buttonOk.events.click =
      this.props.buttonOk.events.click.bind(this);

    this.children.buttonOk = new Button(this.props.buttonOk);

    this.children.buttonEsc = new Button({
      label: "Отмена",
      class: "button btn--white",
      events: {
        click: () => {
          this.props.error = "";
          this.hide();
        },
      },
    });
  }

  show() {
    this.getContent()!.style.display = "flex";
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
