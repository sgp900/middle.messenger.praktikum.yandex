import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";
import { Button } from "../Button/button";
import { Input } from "../Input/input";

export interface FileLoadProps {
  label?: string;
  class?: string;
  type?: string;
  error?: string;
  btnProp: {
    click: () => void;
  };
}

export class FileLoad extends Block<FileLoadProps> {
  protected init(): void {
    const btnClick = this.props.btnProp.click.bind(this);

    this.children.fileInput = new Input({
      name: "avatar",
      type: "file",
      id: "file-upload",
      accept: "image/png, image/jpg",
    });

    this.children.buttonOk = new Button({
      label: "Поменять",
      events: {
        click: btnClick,
      },
    });

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
