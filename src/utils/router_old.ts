import { Validation } from "./validation";

import { LoginRegistration } from "../pages/LoginRegistration/loginRegistration";
import { Messenger } from "../pages/Messenger/messenger";
import { Profile } from "../pages/Profile/profile";
import { ProfileEdit } from "../pages/ProfileEdit/profileEdit";
import { ErrorPage } from "../pages/ErrorPage/errorPage";

import { Block } from "./block";

export function router(page: string): Block {
  switch (page) {
    case "login":
      return new LoginRegistration({
        action: "login",
        title: "Вход",
        linkText: "Нет аккаунта?",
        linkAction: "registration",
        fields: [
          {
            name: "login",
            type: "text",
            placeholder: "Логин",
            error:
              "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
            funcValid: Validation.validLogin,
          },
          {
            name: "password",
            type: "password",
            placeholder: "Пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            funcValid: Validation.validPass,
          },
        ],
      });

    case "registration":
      return new LoginRegistration({
        action: "registration",
        title: "Регистрация",
        linkText: "Войти",
        linkAction: "login",
        fields: [
          {
            name: "email",
            type: "text",
            placeholder: "Почта",
            error:
              "латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
            funcValid: Validation.validEmail,
          },
          {
            name: "login",
            type: "text",
            placeholder: "Логин",
            error:
              "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
            funcValid: Validation.validLogin,
          },
          {
            name: "first_name",
            type: "text",
            placeholder: "Имя",
            error:
              "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
            funcValid: Validation.validName,
          },
          {
            name: "second_name",
            type: "text",
            placeholder: "Фамилия",
            error:
              "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
            funcValid: Validation.validName,
          },
          {
            name: "phone",
            type: "text",
            placeholder: "Телефон",
            error:
              "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
            funcValid: Validation.validPhone,
          },
          {
            name: "password",
            type: "password",
            placeholder: "Пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            funcValid: Validation.validPass,
          },
          {
            name: "passwordConfirm",
            type: "password",
            placeholder: "Повторите пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            funcValid: Validation.validPass,
          },
        ],
      });

    case "messenger":
      return new Messenger({
        userName: "Вадим",
        chatList: [
          {
            avatar: "",
            name: "Андрей",
            time: "10:49",
            msg: "Изображение",
            msgCount: 2,
          },
          {
            avatar: "",
            name: "Андрей",
            time: "10:49",
            msg: "Изображение",
            msgCount: 2,
          },
          {
            avatar: "",
            name: "Илья",
            time: "15:12",
            msg: "Друзья, у меня для вас особенный выпуск новостей!...",
            msgCount: 4,
          },
        ],
        currentChat: {
          selectedChat: 1,
          label: "Вадим",
          messages: [
            {
              text: "Привет!",
              your: false,
            },
            {
              text: "Сколько лет!?",
              your: true,
            },
            {
              text: "Кстати, тут <a onclick='renderPage(`404`)'>наша страница 404</a>, а еще есть <a onclick='renderPage(`500`)'>страница 500</a>",
              your: false,
            },
          ],
        },
      });

    case "profileShow":
      return new Profile({
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        firstName: "Иван",
        secondName: "Иванов",
        displayName: "Иван",
        phone: "+7 (909) 967 30 30",
      });

    case "profileEdit":
      return new ProfileEdit({
        fields: [
          {
            name: "email",
            title: "Почта",
            error:
              "латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
            data: "pochta@yandex.ru",
            funcValid: Validation.validEmail,
          },
          {
            name: "login",
            title: "Логин",
            error:
              "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
            data: "ivanivanov",
            funcValid: Validation.validLogin,
          },
          {
            name: "first_name",
            title: "Имя",
            error:
              "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
            data: "Иван",
            funcValid: Validation.validName,
          },
          {
            name: "second_name",
            title: "Фамилия",
            error:
              "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
            data: "Иванов",
            funcValid: Validation.validName,
          },
          {
            name: "display_name",
            title: "Имя в чате",
            error:
              "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
            data: "Иван",
            funcValid: Validation.validName,
          },
          {
            name: "phone",
            title: "Телефон",
            error:
              "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
            data: "+79099673030",
            funcValid: Validation.validPhone,
          },
        ],
      });
    case "profilePassword":
      return new ProfileEdit({
        fields: [
          {
            name: "oldPassword",
            title: "Старый пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            data: "oldpassword",
            funcValid: Validation.validPass,
          },
          {
            name: "newPassword",
            title: "Новый пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            funcValid: Validation.validPass,
          },
          {
            name: "repPassword",
            title: "Повторите новый пароль",
            error:
              "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
            funcValid: Validation.validPass,
          },
        ],
      });
    case "404":
      return new ErrorPage({
        code: 404,
        text: "Не туда попали",
        linkText: "Назад к чатам",
      });
    case "500":
      return new ErrorPage({
        code: 500,
        text: "Мы уже фиксим",
        linkText: "Назад к чатам",
      });
    default:
      return new ErrorPage({
        code: 404,
        text: "Не туда попали",
        linkText: "Назад к чатам",
      });
  }
}

const global = window as any;

global.router = router;
