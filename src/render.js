import signInUp from "./markup/pages/loginRegistration.hbs";
import chat from "./markup/pages/chat.hbs";
import profile from "./markup/pages/profile.hbs";
import profileShow from "./markup/pages/profileShow.hbs";
import profileEdit from "./markup/pages/profileEdit.hbs";
import profilePswd from "./markup/pages/profilePswd.hbs";
import errors from "./markup/pages/errors.hbs";
import channel from "./markup/components/channel.hbs";
import signInUpInput from "./markup/components/placeHolderInput.hbs";
import searchInput from "./markup/components/searchInput.hbs";
import overlayInput from "./markup/components/overlayInput.hbs";
import overlayFile from "./markup/components/overlayFile.hbs";

import Handlebars from "handlebars/dist/handlebars.runtime";

import avatar from "../img/avatar.svg";
import clip from "../img/clip.svg";
import iconFile from "../img/iconFile.svg";
import iconLocation from "../img/iconLocation.svg";
import iconPhotoVideo from "../img/iconPhotoVideo.svg";

const userData = [
  {
    name: "email",
    title: "Почта",
    data: "pochta@yandex.ru",
  },
  {
    name: "login",
    title: "Логин",
    data: "ivanivanov",
  },
  {
    name: "first_name",
    title: "Имя",
    data: "Иван",
  },
  {
    name: "second_name",
    title: "Фамилия",
    data: "Иванов",
  },
  {
    name: "display_name",
    title: "Имя в чате",
    data: "Иван",
  },
  {
    name: "phone",
    title: "Телефон",
    data: "+7 (909) 967 30 30",
  },
];

const userAvatar = "avatar.svg";

const PAGES = {
  login: {
    template: signInUp,
    data: {
      title: "Вход",
      classForm: "form-login",
      btnText: "Авторизоваться",
      btnAction: "chat",
      linkText: "Нет аккаунта?",
      linkAction: "registration",
      inputs: [
        {
          type: "text",
          name: "login",
          placeholder: "Логин",
          error: "Неверный логин",
        },
        {
          type: "password",
          name: "password",
          placeholder: "Пароль",
          error: "Неверный пароль",
        },
      ],
    },
  },
  registration: {
    template: signInUp,
    data: {
      title: "Регистрация",
      classForm: "form-registration",
      btnText: "Зарегистрироваться",
      btnAction: "chat",
      linkText: "Войти",
      linkAction: "login",
      inputs: [
        {
          type: "text",
          name: "email",
          placeholder: "Почта",
          error: "Некорректный формат",
        },
        {
          type: "text",
          name: "login",
          placeholder: "Логин",
          error: "Логин должен быть не менее 3-х символов",
        },
        {
          type: "text",
          name: "first_name",
          placeholder: "Имя",
          error: "Некорректный формат",
        },
        {
          type: "text",
          name: "second_name",
          placeholder: "Фамилия",
          error: "Некорректный формат",
        },
        {
          type: "text",
          name: "phone",
          placeholder: "Телефон",
          error: "Некорректный формат",
        },
        {
          type: "password",
          name: "password",
          placeholder: "Пароль",
          error: "Некорректный формат",
        },
        {
          type: "password",
          name: "rep_password",
          placeholder: "Повторите пароль",
          error: "Пароли не совпадают",
        },
      ],
    },
  },
  chat: {
    template: chat,
    data: {
      buttonText: "Профиль 〉",
      search: true,
      placeholder: "Поиск",
      chanels: [
        {
          avatar: "",
          name: "Андрей",
          time: "10:49",
          msg: "Изображение",
          msgCount: 2,
        },
        {
          avatar: "",
          name: "Киноклуб",
          time: "12:00",
          msg: "Изображение",
          your: true,
        },
        {
          avatar: "",
          name: "Илья",
          time: "15:12",
          msg: "Друзья, у меня для вас особенный выпуск новостей!...",
          msgCount: 4,
        },
      ],
      overlays: [
        {
          class: "add-user",
          caption: "Добавить пользователя",
          inputName: "addUser",
          inputPlaceHolder: "Логин",
          btnText: "Добавить",
        },
        {
          class: "del-user",
          caption: "Удалить пользователя",
          inputName: "delUser",
          inputPlaceHolder: "Логин",
          inputValue: "Вадим",
          btnText: "Удалить",
        },
      ],
      imgs: {
        clip,
        iconFile,
        iconLocation,
        iconPhotoVideo,
      },
    },
  },
  404: {
    template: errors,
    data: {
      code: "404",
      text: "Не туда попали",
      linkText: "Назад к чатам",
    },
  },
  500: {
    template: errors,
    data: {
      code: "500",
      text: "Мы уже фиксим",
      linkText: "Назад к чатам",
    },
  },
  profile: {
    template: profile,
    data: {
      show: true,
      avatar: userAvatar,
      name: "Иван",
      userData: userData,
      imgs: { avatar },
    },
  },
  profileInfoEdit: {
    template: profile,
    data: {
      edit: true,
      avatar: userAvatar,
      userData: userData,
      imgs: { avatar },
    },
  },
  profilePassword: {
    template: profile,
    data: {
      pswd: true,
      avatar: userAvatar,
      password: "12345",
      imgs: { avatar },
    },
  },
};

function renderPage(page) {
  const root = document.querySelector("#app");

  if (!(page in PAGES)) {
    page = "404";
  }

  const template = PAGES[page].template;

  root.innerHTML = template(PAGES[page].data);
}

window.renderPage = renderPage;

document.addEventListener("DOMContentLoaded", () => {
  Handlebars.registerPartial("placeHolderInput", signInUpInput);
  Handlebars.registerPartial("searchInput", searchInput);
  Handlebars.registerPartial("channel", channel);
  Handlebars.registerPartial("overlayInput", overlayInput);
  Handlebars.registerPartial("overlayFile", overlayFile);
  Handlebars.registerPartial("profileShow", profileShow);
  Handlebars.registerPartial("profileEdit", profileEdit);
  Handlebars.registerPartial("profilePswd", profilePswd);
  const html = signInUp(PAGES["login"].data);

  const root = document.querySelector("#app");
  root.innerHTML = html;
});
