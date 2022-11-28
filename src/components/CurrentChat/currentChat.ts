import Block from "../../utils/block";

import Input from "../Input/input";
import Button from "../Button/button";
import Message, { MessageProps } from "../Message/message";

import template from "./template.hbs";
import styles from "./style.scss";

import clip from "../../../img/clip.svg";
import iconFile from "../../../img/iconFile.svg";
import iconLocation from "../../../img/iconLocation.svg";
import iconPhotoVideo from "../../../img/iconPhotoVideo.svg";
import Validation from "../../utils/validation";
import HTTPTransport from "../../utils/HTTPTransport";

export interface CurrentChatProps {
  selectedChat?: number;
  label: string;
  messages: MessageProps[];
  imgs?: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (e?: Event) => void>;
}

export default class CurrentChat extends Block<CurrentChatProps> {
  constructor(props: CurrentChatProps) {
    // eslint-disable-next-line no-param-reassign
    props.imgs = {
      clip,
      iconFile,
      iconLocation,
      iconPhotoVideo,
    };
    super(props);
  }

  protected init() {
    this.props.events = { submit: this.handleSubmit.bind(this) };

    this.children.messages = CurrentChat.createMessages(this.props.messages);
    this.children.newMsgInput = new Input({
      name: "message",
      placeholder: "Сообщение",
      class: "currentchat-newmsg__input",
      events: {
        focus: () => {},
      },
    });
    this.children.sendBtn = new Button({
      class: "arrow-button",
    });
  }

  private static createMessages(props: MessageProps[]) {
    return props.map((data) => new Message({ ...data }));
  }

  private handleSubmit(event?: Event) {
    event?.preventDefault();

    const newMsgInput = this.children.newMsgInput as Input;
    const element = newMsgInput.element as HTMLInputElement;
    const { value } = element;

    if (value && Validation.validMsg(value)) {
      newMsgInput.props.placeholder = "Сообщение";
      newMsgInput.props.class = "currentchat-newmsg__input";

      const toServer = { [element.name]: value };
      console.log(toServer);

      const HttpRequest = new HTTPTransport();
      const resp = HttpRequest.post("/", toServer);
      resp.catch((error) => {
        console.log(error);
      });
    } else {
      newMsgInput.props.placeholder = "Сообщение не должно быть пустым";
      newMsgInput.props.class = "currentchat-newmsg__input currentchat-newmsg__input--alarm";
    }
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
