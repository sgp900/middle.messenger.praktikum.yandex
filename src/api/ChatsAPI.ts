import BaseAPI from "./BaseAPI";
import { ChatsResponse, User } from "../interfaces/interface";

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read(): Promise<ChatsResponse[]> {
    return this.http.get("/");
  }

  getToken(id: number): Promise<Record<string, string>> {
    return this.http.post(`/token/${id}`, { data: { id } });
  }

  create(title: string) {
    return this.http.post("/", { data: { title } });
  }

  delete(chatId: string) {
    return this.http.delete("/", { data: { chatId } });
  }

  addUserToChat(idUser: number, chatId: number) {
    return this.http.put("/users", {
      data: {
        users: [idUser],
        chatId,
      },
    });
  }

  deleteUserFromChat(idUser: number, chatId: number) {
    return this.http.delete("/users", {
      data: {
        users: [idUser],
        chatId,
      },
    });
  }

  getUsersOfChat(idChat: number): Promise<User[]> {
    return this.http.get(`/${idChat}/users`);
  }

  setAvatar(avatar: FormData) {
    return this.http.put("/avatar", { data: avatar });
  }

  update = undefined;
}
