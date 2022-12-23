import store from "../utils/store";
import { WSTransport, SocketEvent } from "../utils/WSTransport";
import { MessageProps } from "../interfaces/interface";
import ChatController from "./ChatsController";

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
}

class MessagesController {
  private transports: Record<number, WSTransport> = {};

  async connect(id: number) {
    if (this.transports[id]) {
      return;
    }

    const token = await ChatController.getToken(id);
    const userId = store.getState().user.data.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    );

    await transport.connect();

    transport.on(SocketEvent.Message, this.onMessageReceived.bind(this, id));
    transport.on(SocketEvent.Close, this.onConnectionClosed.bind(this, id));

    this.transports[id] = transport;
    this.fethOldMessages(id);
  }

  onConnectionClosed(id: number) {
    delete this.transports[id];
  }

  public onMessageReceived(chatId: number, message: Message | Message[]) {
    let type;

    if (Array.isArray(message)) {
      type = "messages";
    } else {
      type = message.type;
    }

    const messageState = store.getState().messages;
    const oldMessages = (messageState ? messageState[chatId] ?? [] : []) as
      | MessageProps[]
      | [];

    switch (type) {
      case "message": {
        store.set(`messages.${chatId}`, [message, ...oldMessages]);

        break;
      }
      case "messages": {
        if (oldMessages.length) {
          const idOfOldMsgs = (oldMessages as MessageProps[]).reduce(
            (accum: number[], msg: MessageProps) => {
              accum.push(msg.id);
              return accum;
            },
            []
          );

          message = (message as MessageProps[]).filter(
            (msg) => !idOfOldMsgs.includes(msg.id)
          );
        }

        store.set(`messages.${chatId}`, [
          ...(message as Message[]),
          ...oldMessages,
        ]);

        break;
      }
    }
  }

  public fethOldMessages(id: number) {
    const transport = this.transports[id];

    if (!transport) {
      throw new Error("Connection is not establish yet");
    }

    transport.send({
      type: "get old",
      content: "0",
    });
  }

  public async sendMessage(id: number, content: string) {
    try {
      const transport = this.transports[id];

      if (!transport) {
        await this.connect(id);
      }

      transport.send({
        type: "message",
        content,
      });
    } catch {
      // add user Error message that we cant connect to chat
      throw new Error("Connection is not establish yet");
    }
  }

  public closeAll() {
    Object.values(this.transports).forEach((transport) => transport.close());
  }
}

const messagesController = new MessagesController();

export default messagesController;
