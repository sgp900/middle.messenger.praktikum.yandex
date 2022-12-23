import { set } from "./helpers";
import { EventBus } from "./eventBus";
import { ChatsResponse, MessageProps, User } from "../interfaces/interface";

export enum StoreEvents {
  Updated = "updated",
}

export interface StateChat {
  data: ChatsResponse[];
  users: User[][];
}

interface State {
  user: {
    data: User;
  };
  chats: StateChat;
  messages: MessageProps[];
  currentChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): State {
    return this.state;
  }
}

const store = new Store();

export default store;
