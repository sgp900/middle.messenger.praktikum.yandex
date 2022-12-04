import { Block } from "../../utils/block";
import { renderPage } from "../../utils/render";
import { Link } from "../../components/Link/link";

import template from "./template.hbs";
import styles from "./style.scss";

interface ErrorPageProps {
  code: number;
  text: string;
  linkText: string;
}

export class ErrorPage extends Block<ErrorPageProps> {
  protected init(): void {
    this.children.link = new Link({
      class: "error__link",
      label: this.props.linkText,
      events: {
        click: () => {
          renderPage("messenger");
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
