import { Block } from "../../utils/block";

import template from "./template.hbs";
import styles from "./style.scss";

interface SearchInputProps {
  class?: string;
  name: string;
  type?: string;
  placeholder: string;
  error?: string;
  events?: Record<string, (e?: Event) => void>;
}

export class SearchInput extends Block<SearchInputProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
