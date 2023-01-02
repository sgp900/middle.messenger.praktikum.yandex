export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
}

export interface MessageProps {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  user_name?: string;
  content: string;
  isMine?: boolean;
  events?: Record<string, (e?: Event) => void>;
}

export interface ChatsResponse {
  id: number;
  avatar: string;
  avatarSrc: string;
  title: string;
  time?: number | string;
  last_message: MessageProps;
  unread_count: number;
  isMine?: boolean;
  users?: User[];
}

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface GetChatsData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface ServerWSResponse {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: string;
}
