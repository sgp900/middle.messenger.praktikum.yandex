import { Block } from "../../utils/block";
import { Link } from "../../components/Link/link";

import template from "./template.hbs";
import styles from "./style.scss";

interface ErrorPageProps {
  code: number;
  text: string;
}

export class ErrorPage extends Block<ErrorPageProps> {
  protected init(): void {
    this.children.link = new Link({
      class: "error__link",
      label: "Назад к чатам",
      href: "/messenger",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
