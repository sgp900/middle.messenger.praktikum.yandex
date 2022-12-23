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
    return this.http.post(`/token/${id}`, { id });
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  addUserToChat(idUser: number, chatId: number) {
    return this.http.put("/users", {
      users: [idUser],
      chatId,
    });
  }

  deleteUserFromChat(idUser: number, chatId: number) {
    return this.http.delete("/users", {
      users: [idUser],
      chatId,
    });
  }

  getUsersOfChat(idChat: number): Promise<User[]> {
    return this.http.get(`/${idChat}/users`);
  }

  update = undefined;

  delete = undefined;
}
