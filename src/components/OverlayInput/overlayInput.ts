import { Block } from "../../utils/block";
import { PlaceHolderInput } from "../PlaceHolderInput/placeHolderInput";
import { Button } from "../Button/button";

import template from "./template.hbs";
import styles from "./style.scss";

export interface OverlayInputProps {
  class?: string;
  caption: string;
  input: PlaceHolderInput;
  btn: Button;
}

export class OverlayInput extends Block<OverlayInputProps> {
  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
