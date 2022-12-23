import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";
import { Button } from "../Button/button";
import { Input } from "../Input/input";
import UserController from "../../controllers/UserController";

export interface FileLoadProps {
  label?: string;
  class?: string;
  type?: string;
  error: string;
  events?: Record<string, () => void>;
}

export class FileLoad extends Block<FileLoadProps> {
  protected init(): void {
    this.children.fileInput = new Input({
      name: "avatar",
      type: "file",
      id: "file-upload",
      accept: "image/png, image/jpg",
    });

    this.children.buttonOk = new Button({
      label: "Поменять",
      events: {
        click: () => {
          this.hide();

          const File = this.children.fileInput as Input;
          const blobFile = File.element as HTMLInputElement;

          if (blobFile.files?.length) {
            const formData = new FormData();
            formData.append("avatar", blobFile.files[0]);
            UserController.avatar(formData);
          } else {
            this.props.error = "Файл не выбран";
          }
        },
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
