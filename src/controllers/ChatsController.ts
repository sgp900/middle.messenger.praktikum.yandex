import { ChatsAPI } from "../api/ChatsAPI";
import { User } from "../interfaces/interface";
import store from "../utils/store";
import messagesController from "./MessagesController";
import UserController from "./UserController";
import { ResourcesAPI } from "../api/ResourcesAPI";

class ChatsController {
  private readonly api = new ChatsAPI();

  async create(title: string) {
    await this.api.create(title);

    await this.fetchChats();
  }

  async delete(chatId: number) {
    await this.api.delete(String(chatId));

    store.set("currentChat", undefined);

    await this.fetchChats();
  }

  async setAvatar(avatar: FormData) {
    await this.api.setAvatar(avatar);
    await this.fetchChats();
  }

  async fetchChats() {
    const currentUsrId = store.getState().user.data.id;

    const chats = await this.api.read();

    await Promise.all(chats.map((chat) => messagesController.connect(chat.id)));

    const users: User[][] = [];
    const chatAPI = new ResourcesAPI();

    await Promise.all(
      chats.map(async (chat) => {
        let allUser = await this.getUsersOfChat(chat.id);

        allUser = allUser.filter((user) => user.id !== currentUsrId);

        users[chat.id] = allUser;

        if (chat.avatar && chat.avatar.length > 0) {
          try {
            const res = (await chatAPI.read(chat.avatar)) as Blob;
            chat.avatarSrc = URL.createObjectURL(res);
          } catch {
            chat.avatarSrc = "";
          }
        }
      })
    );

    store.set("chats", { data: chats, users });
  }

  async getToken(id: number) {
    const token = await this.api.getToken(id);
    return token.token;
  }

  async addUserToChat(login: string) {
    const user: User[] = await UserController.search(login);
    const selectedChat = store.getState().currentChat;

    if (user[0].id && selectedChat) {
      await this.api.addUserToChat(user[0].id, selectedChat);
    }

    await this.fetchChats();
  }

  async deleteUserFromChat(idUser: number) {
    const selectedChat = store.getState().currentChat;

    if (selectedChat) {
      await this.api.deleteUserFromChat(idUser, selectedChat);

      await this.fetchChats();
    }
  }

  async getUsersOfChat(id: number) {
    return this.api.getUsersOfChat(id);
  }
}

export default new ChatsController();
